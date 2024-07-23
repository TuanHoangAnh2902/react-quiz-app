import _ from 'lodash';

function Question(props) {
	const { data, currentQuestion, handleCheckBox } = props;
	if (_.isEmpty(data)) {
		return <></>;
	}

	const handleHandleCheckBox = (e, answerId, questionId) => {
		handleCheckBox(answerId, questionId);
	};
	return (
		<>
			{data.image ? (
				<div className='q-image'>
					<img
						src={`data:image/jpeg;base64,${data.image}`}
						alt=''
					/>
				</div>
			) : (
				<div className='q-image'></div>
			)}
			<div className='question'>
				Question {currentQuestion + 1}: {data.questionDescription}
			</div>
			<div className='answer'>
				{data.answers &&
					data.answers.length &&
					data.answers.map((answer, index) => {
						return (
							<div
								key={`answer-${index}`}
								className='a-child'>
								<div className='form-check'>
									<input
										checked={answer.isSelected}
										className='form-check-input'
										type='checkbox'
										id='flexCheckDefault'
										onChange={(e) => handleHandleCheckBox(e, answer.id, data.questionId)}
									/>
									<label
										className='form-check-label'
										htmlFor='flexCheckDefault'>
										{answer.description}
									</label>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default Question;
