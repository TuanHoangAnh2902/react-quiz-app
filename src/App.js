import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Header from '~/components/Header/Header';

function App() {
	return (
		<div className='app-container'>
			<div className='header-container'>
				<Header />
			</div>
			<div className='main-container'>
				<div className='sidenav-container'></div>
				<div className='app-content'>
					<PerfectScrollbar>
						<Outlet />
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
}

export default App;
