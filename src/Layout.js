import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from '~/App';
// import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Login from './components/Auth/Login/Login';
import HomePage from './components/Home/HomePage';
import Register from './components/Auth/Register/Register';
import ManagerUser from './components/Admin/Content/ManagerUser';
import Dashboard from './components/Admin/Content/Dashboard';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';

function Layout() {
	const NotFound = () => {
		return (
			<div className='alert alert-danger container mt-3'>
				404.Not Found data width your current URL
			</div>
		);
	};
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<App />}>
					<Route
						index
						element={<HomePage />}
					/>
					<Route
						path='users'
						element={<ListQuiz />}
					/>
				</Route>

				<Route
					path='quiz/:id'
					element={<DetailQuiz />}
				/>

				<Route
					path='admins'
					element={<Admin />}>
					<Route
						index
						element={<Dashboard />}
					/>
					<Route
						path='manage-user'
						element={<ManagerUser />}
					/>
				</Route>
				<Route
					path='login'
					element={<Login />}
				/>
				<Route
					path='register'
					element={<Register />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
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
		</>
	);
}

export default Layout;
