import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars } from 'react-icons/fa';

import './Admin.scss';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

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
					<Outlet />
				</div>
			</div>
			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default Admin;
