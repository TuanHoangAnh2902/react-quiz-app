import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiImageAddFill } from 'react-icons/ri';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { postCreateNewUser } from '~/services/apiService';

function ModalCreateUser(props) {
	const { show, setShow } = props;
	const handleClose = () => {
		setShow(false);
		setEmail('');
		setUsername('');
		setPassword('');
		setImage('');
		setPreviewImage('');
		setRole('USER');
	};

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [image, setImage] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [role, setRole] = useState('USER');

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			);
	};

	const handleSubmitCreateUser = async () => {
		const isValidateEmail = validateEmail(email);

		if (!isValidateEmail) {
			toast.error('Email is invalid');
			return;
		} else if (!password) {
			toast.error('Password is required');
			return;
		} else if (!username) {
			toast.error('Username is required');
			return;
		}

		let data = await postCreateNewUser(email, username, password, role, image);

		if (data && data.EC === 0) {
			toast.success(data.EM);
			handleClose();
		}
		if (data && data.EC !== 0) {
			toast.error(data.EM);
		}
	};

	const handleUpdateEvent = (e) => {
		if (e.target && e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = URL.createObjectURL(file);
			setPreviewImage(reader);
			setImage(file);
		}
	};

	return (
		<>
			<Modal
				className='modal-add-user'
				show={show}
				onHide={handleClose}
				size='xl'
				backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>add new user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='row g-3'>
						<div className='col-md-6'>
							<label className='form-label'>Email</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								className='form-control'
							/>
						</div>
						<div className='col-md-6'>
							<label className='form-label'>Password</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								className='form-control'
							/>
						</div>
						<div className='col-md-6'>
							<label className='form-label'>Username</label>
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								type='text'
								className='form-control'
							/>
						</div>
						<div className='col-md-4'>
							<label className='form-label'>Role</label>
							<select
								value={role}
								className='form-select'
								onChange={(e) => setRole(e.target.value)}>
								<option value={'USER'}>USER</option>
								<option value={'ADMIN'}>ADMIN</option>
							</select>
						</div>
						<div className='col-md-12'>
							<label
								htmlFor='labelUpLoad'
								className='form-label label-upload'>
								<RiImageAddFill />
								Upload file image
							</label>
							<input
								onChange={(e) => handleUpdateEvent(e)}
								id='labelUpLoad'
								type='file'
								hidden
							/>
						</div>
						<div className='col-md-12 img-preview'>
							{!previewImage && <span>preview image</span>}
							{previewImage && (
								<img
									src={previewImage}
									alt=''
								/>
							)}
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={handleSubmitCreateUser}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default ModalCreateUser;
