import { useRef } from 'react';
import CountDown from './CountDown';
import './RightContent.scss';

function RightContent(props) {
	const { dataQuiz, handleFinishQuiz, setCurrentQuestion } = props;

	const refDiv = useRef([]);

	const onTimeUp = () => {
		handleFinishQuiz();
	};

	const getClassQuestion = (question) => {
		//check answered
		if (question && question.answers.length > 0) {
			let isAnswered = question.answers.find((item) => item.isSelected === true);
			if (isAnswered) {
				return 'question selected';
			}
		}
		return 'question';
	};

	const handleClickQuestion = (index) => {
		// Remove 'clicked' class from all questions
		refDiv.current.forEach((div) => {
			if (div) {
				div.className = div.className.replace(' clicked', '');
			}
		});

		// Add 'clicked' class to the clicked question
		setCurrentQuestion(index);
		refDiv.current[index].className += ' clicked';
	};
	return (
		<>
			<div className='main-timer'>
				<CountDown onTimeUp={onTimeUp} />
			</div>
			<div className='main-question'>
				{dataQuiz &&
					dataQuiz.length > 0 &&
					dataQuiz.map((item, index) => (
						<div
							ref={(element) => (refDiv.current[index] = element)}
							onClick={() => handleClickQuestion(index)}
							key={index + 1}
							className={getClassQuestion(item)}>
							{index + 1}
						</div>
					))}
			</div>
		</>
	);
}

export default RightContent;
