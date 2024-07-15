import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ValidateEmail from '~/components/ValidateEmail/ValidateEmail';
import { postLogin } from '~/services/apiService';
import './Login.scss';
import { doLogin } from '~/redux/action/userAction';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isValidateEmail = ValidateEmail(email);
	const handleLogin = async () => {
		if (!isValidateEmail) {
			toast.error('Invalid email');
			return;
		}
		if (!password) {
			toast.error('Password is required');
			return;
		}
		setIsLoading(true);
		// Call API
		let data = await postLogin(email, password);
		if (data && +data.EC === 0) {
			dispatch(doLogin(data));
			toast.success(data.EM);
			setIsLoading(false);
			navigate('/');
		}
		if (data && +data.EC !== 0) {
			toast.error(data.EM);
			setIsLoading(false);
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
							onClick={handleLogin}
							disabled={isLoading}>
							{isLoading && <ImSpinner9 className='loader-icon' />}
							<span>Login</span>
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
