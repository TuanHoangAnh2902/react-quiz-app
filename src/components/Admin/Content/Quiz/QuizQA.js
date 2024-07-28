import { RiImageAddLine } from 'react-icons/ri';
import { AiOutlineMinusSquare, AiOutlinePlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { toast } from 'react-toastify';

import {
	getAllQuizForAdmin,
	postCreateNewQuestionForQuiz,
	postCreateNewAnswerForQuestion,
	getQuizWithQA,
} from '~/services/apiService';
import './QuizQA.scss';
import UrlToFile from '~/components/UrlToFile/UrlToFile';

function QuizQA() {
	const initQuestions = [
		{
			id: uuidv4(),
			description: '',
			imageFile: '',
			imageName: '',
			answers: [
				{
					id: uuidv4(),
					description: '',
					isCorrect: false,
				},
			],
		},
	];
	const [open, setOpen] = useState(false);
	const [selectedQuiz, setSelectedQuiz] = useState({});
	const [listQuiz, setListQuiz] = useState([]);
	const [questions, setQuestions] = useState(initQuestions);
	const [dataImagePreview, setDataImagePreview] = useState({
		url: '',
	});

	useEffect(() => {
		fetchQuiz();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (selectedQuiz && selectedQuiz.value) {
			fetchQuizWithQA(selectedQuiz.value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedQuiz]);

	const fetchQuizWithQA = async (quizId) => {
		let res = await getQuizWithQA(quizId);
		if (res && res.EC === 0) {
			//convert base64 to file object
			// let newQA = [];
			for (let i = 0; i < res.DT.qa.length; i++) {
				let q = res.DT.qa[i];
				if (q.imageFile) {
					q.imageName = `Question-${q.id}.png`;
					q.imageFile = await UrlToFile(
						`data:image/png;base64,${q.imageFile}`,
						`Question-${q.id}.png`,
						`image/png`,
					);
				}
				// newQA.push(q);
			}
			setQuestions(res.DT.qa);
		}
	};

	const fetchQuiz = async () => {
		let res = await getAllQuizForAdmin();
		if (res && res.EC === 0) {
			let newQuiz = res.DT.map((item) => {
				return {
					value: item.id,
					label: `${item.id} - ${item.description}`,
				};
			});
			setListQuiz(newQuiz);
		}
	};

	const handleAddRemoveQuestion = (type, id) => {
		if (type === 'ADD') {
			const newQuestion = {
				id: uuidv4(),
				description: '',
				imageFile: '',
				imageName: '',
				answers: [
					{
						id: uuidv4(),
						description: '',
						isCorrect: false,
					},
				],
			};
			setQuestions([...questions, newQuestion]);
		} else if (type === 'REMOVE') {
			setQuestions(questions.filter((question) => question.id !== id));
		}
	};

	const handleAddRemoveAnswer = (type, questionId, answerId) => {
		const questionClone = _.cloneDeep(questions);
		const index = questionClone.findIndex((item) => item.id === questionId);

		if (index !== -1) {
			if (type === 'ADD') {
				const newAnswer = {
					id: uuidv4(),
					description: '',
					isCorrect: false,
				};
				questionClone[index].answers.push(newAnswer);
			} else if (type === 'REMOVE') {
				questionClone[index].answers = questionClone[index].answers.filter(
					(item) => item.id !== answerId,
				);
			}
			setQuestions(questionClone);
		}
	};

	const handleOnChange = (type, questionId, value) => {
		const questionClone = _.cloneDeep(questions);
		const index = questionClone.findIndex((item) => item.id === questionId);

		if (index !== -1 && type === 'QUESTION') {
			questionClone[index].description = value;
			setQuestions(questionClone);
		}
	};

	const handleOnChangeFileQuestion = (questionId, e) => {
		const questionClone = _.cloneDeep(questions);
		const index = questionClone.findIndex((item) => item.id === questionId);

		if (index !== -1 && e.target.files?.[0]) {
			questionClone[index].imageFile = e.target.files[0];
			questionClone[index].imageName = e.target.files[0].name;
			setQuestions(questionClone);
		}
	};

	const handleAnswerQuestion = (type, answerId, questionId, value) => {
		const questionClone = _.cloneDeep(questions);
		const index = questionClone.findIndex((item) => item.id === questionId);

		if (index !== -1) {
			questionClone[index].answers = questionClone[index].answers.map((answer) => {
				if (answer.id === answerId) {
					if (type === 'CHECKBOX') {
						answer.isCorrect = value;
					} else if (type === 'INPUT') {
						answer.description = value;
					}
				}
				return answer;
			});
			setQuestions(questionClone);
		}
	};

	const handleSubmitQuestionForQuiz = async () => {
		//todo
		if (_.isEmpty(selectedQuiz)) {
			toast.error('Please select quiz');
			return;
		}
		//validate answer
		let isValidAnswer = true;
		let indexQuestion = 0,
			indexAnswer = 0;
		for (let i = 0; i < questions.length; i++) {
			for (let j = 0; j < questions[i].answers.length; j++) {
				if (!questions[i].answers[j].description) {
					isValidAnswer = false;
					break;
				}
			}
			indexQuestion = i;
			if (isValidAnswer === false) break;
		}
		if (isValidAnswer === false) {
			toast.error(`Answer ${indexAnswer + 1} of question ${indexQuestion + 1} is empty`);
			return;
		}
		//validate question
		let isValidQuestion = true;
		let indexQuestion1 = 0;
		for (let i = 0; i < questions.length; i++) {
			if (!questions[i].description) {
				isValidQuestion = false;
				indexQuestion1 = i;
				break;
			}
			if (isValidQuestion === false) {
				toast.error(`Question ${indexQuestion1 + 1} is empty`);
				return;
			}
		}

		for (const question of questions) {
			const q = await postCreateNewQuestionForQuiz(
				+selectedQuiz.value,
				question.description,
				question.imageFile,
			);
			//submit answer
			for (const answer of question.answers) {
				await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
			}
		}
		toast.success('Create question success');
		setQuestions(initQuestions);
	};

	const handlePreviewImage = (questionId) => {
		const questionClone = _.cloneDeep(questions);
		const index = questionClone.findIndex((item) => item.id === questionId);
		if (index !== -1) {
			setDataImagePreview({ url: URL.createObjectURL(questionClone[index].imageFile) });
		}
		setOpen(true);
	};

	const colourStyles = {
		control: (styles) => ({ ...styles, backgroundColor: 'white' }),
		option: (styles, { data, isDisabled }) => {
			return {
				...styles,
				backgroundColor: isDisabled ? 'red' : '#CCC',
				color: 'black',
				cursor: isDisabled ? 'not-allowed' : 'default',
			};
		},
		// ...
	};
	return (
		<div className='question-container'>
			<div className='add-new-question'>
				<div className='col-6 form-group'>
					<label
						className='mb-2'
						htmlFor=''>
						Select Quiz:
					</label>
					<Select
						styles={colourStyles}
						value={selectedQuiz}
						onChange={setSelectedQuiz}
						options={listQuiz}
					/>
				</div>
				<div className='mt-3 mb-2'>Add questions:</div>
				{questions &&
					questions.length > 0 &&
					questions.map((question, index) => (
						<div
							key={question.id}
							className='question-main my-4'>
							<div className='questions-content'>
								<div className='form-floating description'>
									<input
										type='text'
										className='form-control'
										placeholder='name@example.com'
										value={question.description}
										onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)}
									/>
									<label>Question's {index + 1} description</label>
								</div>
								<div className='group-upload'>
									<label htmlFor={question.id}>
										<RiImageAddLine className='label-up' />
									</label>
									<input
										onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
										type='file'
										id={question.id}
										hidden
									/>
									<span>
										{question.imageName ? (
											<span
												className='preview-image'
												onClick={() => handlePreviewImage(question.id)}>
												{question.imageName}
											</span>
										) : (
											'0 file is upload'
										)}
									</span>
								</div>
								<div className='btn-add'>
									<span onClick={() => handleAddRemoveQuestion('ADD', '')}>
										<BiPlusCircle className='icon-add' />
									</span>
									{questions.length > 1 && (
										<span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
											<AiOutlineMinusCircle className='icon-remove' />
										</span>
									)}
								</div>
							</div>
							{question.answers.map((answer, index) => (
								<div
									key={answer.id}
									className='answers-content'>
									<input
										className='form-check-input iscorrect'
										type='checkbox'
										checked={answer.isCorrect}
										onChange={(e) =>
											handleAnswerQuestion('CHECKBOX', answer.id, question.id, e.target.checked)
										}
									/>
									<div className='form-floating answer-name'>
										<input
											placeholder=''
											type='text'
											className='form-control'
											value={answer.description}
											onChange={(e) => handleAnswerQuestion('INPUT', answer.id, question.id, e.target.value)}
										/>
										<label>answer {index + 1}</label>
									</div>
									<div className='btn-group'>
										<span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
											<AiOutlinePlusSquare className='icon-add' />
										</span>
										{question.answers.length > 1 && (
											<span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
												<AiOutlineMinusSquare className='icon-remove' />
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					))}
				{questions && questions.length > 0 && (
					<div>
						<button
							onClick={() => handleSubmitQuestionForQuiz()}
							className='btn btn-warning'>
							Save Question
						</button>
					</div>
				)}
				<>
					<Lightbox
						open={open}
						close={() => setOpen(false)}
						slides={[{ src: dataImagePreview.url ? dataImagePreview.url : '' }]}
						plugins={[Zoom]}
					/>
				</>
			</div>
		</div>
	);
}

export default QuizQA;
