import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getDataQuiz } from '~/services/apiService';
function DetailQuiz() {
	const params = useParams();
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

	return <div className='detail-quiz-container'>detail</div>;
}

export default DetailQuiz;
