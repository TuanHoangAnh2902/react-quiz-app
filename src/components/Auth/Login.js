import React, { useState } from 'react';
import './Login.scss';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {};

	return (
		<>
			<div className='login-container'>
				<div className='header'>Don't have an account yet?</div>
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
				</div>
			</div>
		</>
	);
}

export default Login;
