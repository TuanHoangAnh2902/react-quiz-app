import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';

import './detailQuiz.scss';
import { getDataQuiz } from '~/services/apiService';
function DetailQuiz() {
	const params = useParams();
	const location = useLocation();

	const quizId = params.id;

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
						answers.push(item.answers);
					});
					return { questionId: key, answers, questionDescription, image };
				})
				.value();
			console.log(data);
		}
	};

	return (
		<div className='detail-quiz-container'>
			<div className='left-content'>
				<div className='title'>
					Quiz {quizId}:{location?.state?.quizTitle}
				</div>
				<hr />
				<div className='q-body'>
					<img
						src=''
						alt=''
					/>
				</div>
				<div className='q-content'>
					<div className='question'>Question 1: how are you doing</div>
					<div className='answer'>
						<div className='a-child'>A. kltuhgfkjbn</div>
						<div className='a-child'>B. kltuhgfkjbn</div>
						<div className='a-child'>C. kltuhgfkjbn</div>
					</div>
				</div>
				<div className='footer'>
					<button className='btn btn-secondary'>Prev</button>
					<button className='btn btn-primary'>Next</button>
				</div>
			</div>
			S<div className='right-content'>count down</div>
		</div>
	);
}

export default DetailQuiz;
