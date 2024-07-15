import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyles from './components/GlobalStyles';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Content/ManagerUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalStyles>
			<BrowserRouter>
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
							element={<User />}
						/>
					</Route>
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
				</Routes>
			</BrowserRouter>
		</GlobalStyles>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
