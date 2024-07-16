import { useSelector } from 'react-redux';

import videoHomePage from '~/assets/videos/video-homePage.mp4';
import './HomePage.scss';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage(props) {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const nagivate = useNavigate();
	return (
		<div className='homepage-container'>
			<video
				autoPlay
				muted
				loop>
				<source
					src={videoHomePage}
					type='video/mp4'
				/>
			</video>
			<div className='homepage-content'>
				<div className='title-1'>Make forms worth filling out</div>
				<div className='title-2'>
					Get more data - like signups, feedback, and anything else - with forms designed to be
					refreshingly different.
				</div>
				<div className='title-3'>
					{isAuthenticated === false ? (
						<button onClick={() => nagivate('/login')}>Get started - it's free</button>
					) : (
						<button onClick={() => nagivate('/users')}>Doing quiz now</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default HomePage;
