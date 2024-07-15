import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { postLogin } from '~/services/apiService';
// import ValidateEmail from '~/components/ValidateEmail/ValidateEmail';
import './Login.scss';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const handleLogin = async () => {
		let data = await postLogin(email, password);
		if (data && +data.EC === 0) {
			toast.success(data.EM);
			navigate('/');
		}
		if (data && +data.EC !== 0) {
			toast.error(data.EM);
		}
	};

	return (
		<>
			<div className='login-container'>
				<div className='header'>
					<span>Don't have an account yet?</span>
					<button
						onClick={() => {
							navigate('/register');
						}}>
						Sign up
					</button>
					<span className='contact-us'>Contact's us</span>
				</div>
				<div className='title col-3 mx-auto'>Mr.Tuan</div>
				<div className='welcome col-3 mx-auto'>Hello, who's this?</div>
				<div className='content-form col-3 mx-auto'>
					<div className='form-group'>
						<label htmlFor=''>Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor=''>Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							className='form-control'
						/>
					</div>
					<span className='forgot-password'>Forgot password?</span>
					<div>
						<button
							className='btn-submit'
							onClick={handleLogin}>
							Login
						</button>
					</div>
					<div className='text-center'>
						<span
							className='back'
							onClick={() => {
								navigate('/');
							}}>
							&#60;&#60; Go to homepage
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
