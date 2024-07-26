import Select from 'react-select';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';

import { postCreateNewQuiz, getAllQuizForAdmin } from '~/services/apiService';

import './ManageQuiz.scss';
import TableQuiz from './TableQuiz';

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
	const [inputKey, setInputKey] = useState('');

	const [listQuiz, setListQuiz] = useState([]);

	//clear file input
	const functionThatResetsTheFileInput = () => {
		let randomString = Math.random().toString(36);
		setInputKey(randomString);
	};

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
			functionThatResetsTheFileInput();
			await fetchQuiz();
			toast.success(res.EM);
		} else {
			toast.error(res.EM);
		}
	};
	const fetchQuiz = async () => {
		let res = await getAllQuizForAdmin();
		if (res && res.EC === 0) {
			setListQuiz(res.DT);
		}
	};
	return (
		<div className='quiz-container'>
			<Accordion defaultActiveKey='0'>
				<Accordion.Item eventKey='0'>
					<Accordion.Header>Manage Quizzes</Accordion.Header>
					<Accordion.Body>
						<div className='add-new'>
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
									key={inputKey || ''}
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
						</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className='list-detail'>
				<TableQuiz
					fetchQuiz={fetchQuiz}
					setListQuiz={setListQuiz}
					listQuiz={listQuiz}
				/>
			</div>
		</div>
	);
}

export default ManageQuiz;
