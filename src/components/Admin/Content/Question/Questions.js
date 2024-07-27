import { RiImageAddLine } from 'react-icons/ri';
import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
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
			description: 'question 1',
			imageFile: '',
			imageName: '',
			answers: [
				{
					id: uuidv4(),
					description: 'answer 1',
					isCorrect: false,
				},
			],
		},
	]);

	const handleAddRemoveQuestion = (type, id) => {
		if (type === 'ADD') {
			const newQuestion = {
				id: uuidv4(),
				description: 'question 1',
				imageFile: '',
				imageName: '',
				answers: [
					{
						id: uuidv4(),
						description: 'answer 1',
						isCorrect: false,
					},
					{
						id: uuidv4(),
						description: 'answer 2',
						isCorrect: false,
					},
				],
			};
			setQuestions([...questions, newQuestion]);
		}
		if (type === 'REMOVE') {
			let questionClone = _.cloneDeep(questions);
			questionClone = questionClone.filter((question) => question.id !== id);
			setQuestions(questionClone);
		}
	};

	const handleAddRemoveAnswer = (type, questionId, answerId) => {
		let questionClone = _.cloneDeep(questions);
		let index = questionClone.findIndex((item) => item.id === questionId);

		if (type === 'ADD') {
			const newAnswer = {
				id: uuidv4(),
				description: 'answer 1',
				isCorrect: false,
			};

			questionClone[index].answers.push(newAnswer);
			setQuestions(questionClone);
		}
		if (type === 'REMOVE') {
			questionClone[index].answers = questionClone[index].answers.filter(
				(item) => item.id !== answerId,
			);
			setQuestions(questionClone);
		}
	};

	console.log('questions', questions);
	return (
		<div className='question-container'>
			<div className='title'>Manage Question</div>
			<hr />
			<div className='add-new-question'>
				<div className='col-6 form-group'>
					<label
						className='mb-2'
						htmlFor=''>
						Select Quiz:{' '}
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
					questions.map((question, index) => {
						return (
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
										/>
										<label>Question's {index + 1} description</label>
									</div>
									<div className='group-upload'>
										<label>
											<RiImageAddLine className='label-up' />
										</label>
										<input
											type='file'
											hidden
										/>
										<span>0 file is upload</span>
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
								{question.answers &&
									question.answers.length > 0 &&
									question.answers.map((answer, index) => {
										return (
											<div
												key={answer.id}
												className='answers-content'>
												<input
													className='form-check-input iscorrect'
													type='checkbox'
													id='flexCheckDefault'
												/>
												<div className='form-floating answer-name'>
													<input
														type='text'
														className='form-control'
														value={answer.description}
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
										);
									})}
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default Questions;
