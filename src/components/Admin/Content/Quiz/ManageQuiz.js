import Select from 'react-select';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { postCreateNewQuiz } from '~/services/apiService';
import './ManageQuiz.scss';

const options = [
	{ value: 'EASY', label: 'EASY' },
	{ value: 'MEDIUM', label: 'MEDIUM' },
	{ value: 'HARD', label: 'HARD' },
];
function ManageQuiz() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('');
	const [image, setImage] = useState('');

	const handleChangeFile = (e) => {
		if (e.target && e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImage(file);
		}
	};
	const handleSubmit = async () => {
		if (!name || !description || !type || !image) {
			toast.error('Please fill all fields');
			return;
		}
		let res = await postCreateNewQuiz(description, name, type?.value, image);
		if (res && res.EC === 0) {
			setName('');
			setDescription('');
			setType('');
			setImage('');
			toast.success(res.EM);
		} else {
			toast.error(res.EM);
		}
	};
	return (
		<div className='quiz-container'>
			<div className='title'>Manage Quiz</div>
			<hr />
			<div className='add-new'>
				<fieldset className='border rounded-3 p-3'>
					<legend className='float-none w-auto px-3'>Add new Quiz</legend>
					<div className='form-floating mb-3'>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='text'
							className='form-control'
							placeholder='Name'
						/>
						<label htmlFor='floatingInput'>Name</label>
					</div>
					<div className='form-floating'>
						<input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type='text'
							className='form-control'
							placeholder='Description'
						/>
						<label htmlFor='floatingPassword'>Description</label>
					</div>
					<div className='my-3'>
						<Select
							value={type}
							placeholder='Quiz type...'
							//   value={selectedOption}
							defaultValue={type}
							onChange={setType}
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
							onChange={(e) => handleChangeFile(e)}
							className='form-control'
							type='file'
						/>
					</div>
					<div className='mt-3'>
						<button
							onClick={() => handleSubmit()}
							className='btn btn-warning'>
							Save
						</button>
					</div>
				</fieldset>
			</div>

			<div className='list-detail'>table</div>
		</div>
	);
}

export default ManageQuiz;
