import { RiImageAddLine } from 'react-icons/ri';
import { AiOutlineMinusSquare, AiOutlinePlusSquare, AiOutlineMinusCircle } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import './Questions.scss';

function Questions() {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	const [selectedQuiz, setSelectedQuiz] = useState({});
	const [questions, setQuestions] = useState([
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
	]);

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

	const handleSubmitQuestionForQuiz = () => {
		console.log(`questions`, questions);
	};
	return (
		<div className='question-container'>
			<div className='title'>Manage Question</div>
			<hr />
			<div className='add-new-question'>
				<div className='col-6 form-group'>
					<label
						className='mb-2'
						htmlFor=''>
						Select Quiz:
					</label>
					<Select
						value={selectedQuiz}
						onChange={setSelectedQuiz}
						options={options}
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
									<span>{question.imageName || '0 file is upload'}</span>
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
							{question.answers.map((answer, idx) => (
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
										<label>answer {idx + 1}</label>
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
							Save Questions
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Questions;
