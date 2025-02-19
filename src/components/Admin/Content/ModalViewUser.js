import 'react-toastify/dist/ReactToastify.css';
import { RiImageAddFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

function ModalViewUser(props) {
	const { show, setShow, dataUpdate, resetupdateData } = props;
	const handleClose = () => {
		setShow(false);
		setEmail('');
		setUsername('');
		setPassword('');
		setImage('');
		setPreviewImage('');
		setRole('USER');
		resetupdateData();
	};

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [, setImage] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [role, setRole] = useState('USER');

	useEffect(() => {
		if (!_.isEmpty(dataUpdate)) {
			setEmail(dataUpdate.email);
			setUsername(dataUpdate.username);
			setRole(dataUpdate.role);
			setImage('');
			if (dataUpdate.image) {
				setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
			}
		}
	}, [dataUpdate]);

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
					<Modal.Title>Update a user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='row g-3'>
						<div className='col-md-6'>
							<label className='form-label'>Email</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled
								type='email'
								className='form-control'
							/>
						</div>
						<div className='col-md-6'>
							<label className='form-label'>Password</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled
								type='password'
								className='form-control'
							/>
						</div>
						<div className='col-md-6'>
							<label className='form-label'>Username</label>
							<input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled
								type='text'
								className='form-control'
							/>
						</div>
						<div className='col-md-4'>
							<label className='form-label'>Role</label>
							<select
								value={role}
								className='form-select'
								disabled
								onChange={(e) => setRole(e.target.value)}>
								<option value={'USER'}>USER</option>
								<option value={'ADMIN'}>ADMIN</option>
							</select>
						</div>
						<div className='col-md-12'>
							<label
								// htmlFor='labelUpLoad'
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
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default ModalViewUser;
