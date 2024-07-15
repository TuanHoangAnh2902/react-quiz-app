import { useNavigate } from 'react-router-dom';
import ValidateEmail from '~/components/ValidateEmail/ValidateEmail';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import Image from 'react-image-webp';

import './Register.scss';
import { postRegister } from '~/services/apiService';

function Register() {
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	const handleClickRegister = async () => {
		if (ValidateEmail(email) && password === confirmPassword) {
			let data = await postRegister(email, userName, password);
			if (data && data.EC === 0) {
				toast.success(data.EM);
				navigate('/login');
			}
			if (data && data.EC !== 0) {
				toast.error(data.EM);
			}
		} else if (!ValidateEmail(email)) {
			toast.error('Email is invalid');
		} else if (password !== confirmPassword) {
			toast.error('Password and Confirm Password are not the same');
		}
	};
	return (
		<>
			<div className='register-container'>
				<div className='background-side'>
					<h2>
						Sign up <br /> and come on in
					</h2>
					<Image
						src={require('~/assets/img/register-bg.webp')}
						webp={require('~/assets/img/register-bg.webp')}
					/>
				</div>
				<div className='register-side'>
					<h2 className='title'>Register</h2>
					<p className='sub-title'>Get better data with conversational forms, surveys, quizzes & more.</p>
					<div className='register-form col-4 mx-auto'>
						<div className='form-group my-3'>
							<label htmlFor=''>Email (*)</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								className='form-control'
							/>
						</div>
						<div className='form-group my-3'>
							<label htmlFor=''>User Name</label>
							<input
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								type='text'
								className='form-control'
							/>
						</div>
						<div className='form-group my-3'>
							<label htmlFor=''>Password (*)</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								className='form-control'
							/>
						</div>
						<div className='form-group my-3'>
							<label htmlFor=''>Confirm Password (*)</label>
							<input
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								type='password'
								className='form-control'
							/>
						</div>
						<div>
							<button
								className='register-btn'
								onClick={handleClickRegister}>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
