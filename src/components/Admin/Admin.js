import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import './Admin.scss';
import Sidebar from './Sidebar';

function Admin(props) {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<div className='admin-container'>
			<div className='admin-sidebar'>
				<Sidebar collapsed={collapsed} />
			</div>
			<div className='admin-content'>
				<div className='admin-header'>
					<FaBars
						onClick={() => {
							setCollapsed(!collapsed);
						}}
					/>
				</div>
				<div className='admin-main'>
					<PerfectScrollbar>
						<Outlet />
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
}

export default Admin;
