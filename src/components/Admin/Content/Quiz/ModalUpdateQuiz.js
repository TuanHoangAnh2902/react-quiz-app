import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

import { putUpdateQuiz } from '~/services/apiService';

const options = [
	{ value: 'EASY', label: 'EASY' },
	{ value: 'MEDIUM', label: 'MEDIUM' },
	{ value: 'HARD', label: 'HARD' },
];

function ModalUpdateQuiz(props) {
	const { show, setShow, dataUpdate, fetchQuiz } = props;
	const handleClose = () => {
		setShow(false);
		setNameUpdate('');
		setDescriptionUpdate('');
		setTypeUpdate({ value: '' });
		setImageUpdate('');
		setPreviewImageUpdate('');
	};

	const [nameUpdate, setNameUpdate] = useState('');
	const [descriptionUpdate, setDescriptionUpdate] = useState('');
	const [typeUpdate, setTypeUpdate] = useState({ value: '' });
	const [imageUpdate, setImageUpdate] = useState('');
	const [previewImageUpdate, setPreviewImageUpdate] = useState('');

	console.log(
		'nameUpdate: ',
		nameUpdate,
		'descriptionUpdate: ',
		descriptionUpdate,
		'typeUpdate: ',
		typeUpdate?.value,
		'imageUpdate: ',
		imageUpdate,
	);

	useEffect(() => {
		if (!_.isEmpty(dataUpdate)) {
			setNameUpdate(dataUpdate.name);
			setDescriptionUpdate(dataUpdate.description);
			setTypeUpdate({ value: dataUpdate.difficulty });
			setImageUpdate('');
			if (dataUpdate.image) {
				setPreviewImageUpdate(`data:image/jpeg;base64,${dataUpdate.image}`);
			}
		}
	}, [dataUpdate]);

	const handleUpdateEvent = (e) => {
		if (e.target && e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = URL.createObjectURL(file);
			setPreviewImageUpdate(reader);
			setImageUpdate(file);
		}
	};

	const handleSubmitUpdateQuiz = async () => {
		let data = await putUpdateQuiz(
			dataUpdate.id,
			nameUpdate,
			descriptionUpdate,
			typeUpdate?.value,
			imageUpdate,
		);
		if (data && data.EC === 0) {
			toast.success(data.EM);
			await fetchQuiz();
			handleClose();
		}
		if (data && data.EC !== 0) {
			toast.error(data.EM);
			console.log(data);
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
					<Modal.Title>Update a Quiz</Modal.Title>
				</Modal.Header>
				<div className='quiz-container'>
					<div className='add-new'>
						<fieldset className='border rounded-3 p-3'>
							<legend className='float-none w-auto px-3'>Update Quiz</legend>
							<div className='form-floating mb-3'>
								<input
									value={nameUpdate}
									onChange={(e) => setNameUpdate(e.target.value)}
									type='text'
									className='form-control'
									placeholder='Name'
								/>
								<label htmlFor='floatingInput'>Name</label>
							</div>
							<div className='form-floating'>
								<input
									value={descriptionUpdate}
									onChange={(e) => setDescriptionUpdate(e.target.value)}
									type='text'
									className='form-control'
									placeholder='Description'
								/>
								<label htmlFor='floatingPassword'>Description</label>
							</div>
							<div className='my-3'>
								<Select
									placeholder='Quiz type...'
									defaultValue={typeUpdate}
									onChange={setTypeUpdate}
									options={options}
								/>
							</div>
							<div className='more-actions form-group'>
								<label
									className='mb-1'
									htmlFor=''>
									Upload image
								</label>
								<input
									onChange={(e) => handleUpdateEvent(e)}
									className='form-control'
									type='file'
								/>
							</div>
							<div className='col-md-12 img-preview mt-3'>
								{!previewImageUpdate && <span>preview image</span>}
								{previewImageUpdate && (
									<img
										src={previewImageUpdate}
										alt=''
									/>
								)}
							</div>
						</fieldset>
					</div>
				</div>

				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={handleSubmitUpdateQuiz}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default ModalUpdateQuiz;
