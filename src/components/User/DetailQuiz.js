import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _, { forEach } from 'lodash';

import './detailQuiz.scss';
import { getDataQuiz } from '~/services/apiService';
import Question from './Question.js/Question';
function DetailQuiz() {
	const params = useParams();
	const location = useLocation();

	const quizId = params.id;

	const [dataQuiz, setDataQuiz] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);

	useEffect(() => {
		fetchQuestions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizId]);
	const fetchQuestions = async () => {
		let res = await getDataQuiz(quizId);
		if (res && res.EC === 0) {
			let raw = res.DT;
			let data = _.chain(raw)
				// Group the elements of Array based on `id` property
				.groupBy('id')
				// `key` is group's name (id), `value` is the array of objects
				.map((value, key) => {
					let answers = [];
					let questionDescription,
						image = null;

					value.forEach((item, index) => {
						// console.log('item', item);
						if (index === 0) {
							questionDescription = item.description;
							image = item.image;
						}
						item.answers.isSelected = false;
						answers.push(item.answers);
					});
					return { questionId: key, answers, questionDescription, image };
				})
				.value();
			setDataQuiz(data);
		}
	};

	const handlePrev = () => {
		if (currentQuestion - 1 < 0) return;

		setCurrentQuestion(currentQuestion - 1);
	};
	const handleNext = () => {
		if (dataQuiz && dataQuiz.length > currentQuestion + 1) setCurrentQuestion(currentQuestion + 1);
	};
	const handleCheckBox = (answerId, questionId) => {
		let dataQuizClone = _.cloneDeep(dataQuiz);
		let question = dataQuizClone.find((item) => +item.questionId === +questionId);

		if (question && question.answers) {
			let selected = question.answers.map((item) => {
				if (+item.id === +answerId) {
					item.isSelected = !item.isSelected;
				}
				return item;
			});
			question.answers = selected;
			// console.log('question: ', question);
			// console.log('selected: ', selected);
		}
		let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
		if (index > -1) {
			dataQuizClone[index] = question;
			setDataQuiz(dataQuizClone);
		}
	};

	const handleFinishQuiz = () => {
		// 	{
		// 		"quizId": 1,
		// 		"answers": [
		// 			 {
		// 				  "questionId": 1,
		// 				  "userAnswerId": [3]
		// 			 },
		// 			 {
		// 				  "questionId": 2,
		// 				  "userAnswerId": [6]
		// 			 }
		// 		]
		//   }
		console.log('dataQuiz:', dataQuiz);
		let payload = {
			quizId: +quizId,
			answers: [],
		};
		let answers = [];
		if (dataQuiz && dataQuiz.length > 0) {
			dataQuiz.forEach((question) => {
				let questionId = question.questionId;
				let userAnswerId = [];

				question.answers.forEach((answer) => {
					if (answer.isSelected) {
						userAnswerId.push(answer.id);
					}
				});
				answers.push({ questionId: +questionId, userAnswerId });
			});
			payload.answers = answers;
			console.log('final payload:', payload);
		}
	};

	return (
		<div className='detail-quiz-container'>
			<div className='left-content'>
				<div className='title'>
					Quiz {quizId}: {location?.state?.quizTitle}
				</div>
				<hr />
				<div className='q-body'>
					<img
						src=''
						alt=''
					/>
				</div>
				<div className='q-content'>
					<Question
						handleCheckBox={handleCheckBox}
						currentQuestion={currentQuestion}
						data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []}
					/>
				</div>
				<div className='footer'>
					<button
						onClick={() => handlePrev()}
						className='btn btn-secondary'>
						Prev
					</button>
					<button
						onClick={() => handleNext()}
						className='btn btn-primary'>
						Next
					</button>
					<button
						onClick={() => handleFinishQuiz()}
						className='btn btn-warning'>
						Finish
					</button>
				</div>
			</div>
			<div className='right-content'>count down</div>
		</div>
	);
}

export default DetailQuiz;
