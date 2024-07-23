import Select from 'react-select';

import './ManageQuiz.scss';
import { useState } from 'react';

const options = [
	{ value: 'EASY', label: 'EASY' },
	{ value: 'MEDIUM', label: 'MEDIUM' },
	{ value: 'HARD', label: 'HARD' },
];
function ManageQuiz() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('EASY');
	const [image, setImage] = useState('');

	const handleChangeFile = (e) => {};

	return (
		<div className='quiz-container'>
			<div className='title'>Manage Quiz</div>
			<hr />
			<div className='add-new'>
				<fieldset className='border rounded-3 p-3'>
					<legend className='float-none w-auto px-3'>Add new Quiz</legend>
					<div class='form-floating mb-3'>
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
							//   onChange={this.handleChange}
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
				</fieldset>
			</div>

			<div className='list-detail'>table</div>
		</div>
	);
}

export default ManageQuiz;
