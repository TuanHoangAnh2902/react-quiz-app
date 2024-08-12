import { useEffect, useState } from 'react';

function CountDown(props) {
	const { onTimeUp } = props;

	const [countdown, setCountdown] = useState(300);

	const toHHMMSS = (secs) => {
		const sec_num = parseInt(secs, 10);
		const hours = Math.floor(sec_num / 3600);
		const minutes = Math.floor(sec_num / 60) % 60;
		const seconds = sec_num % 60;

		return [hours, minutes, seconds]
			.map((v) => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	};

	useEffect(() => {
		if (countdown === 0) {
			onTimeUp();
			return;
		}
		const timer = setInterval(() => {
			setCountdown(countdown - 1);
		}, 1000);

		return () => {
			clearInterval(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countdown]);

	return <div className='countdown-container'>{toHHMMSS(countdown)}</div>;
}

export default CountDown;
