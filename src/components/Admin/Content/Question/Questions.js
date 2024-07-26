import { AiOutlineMinusSquare } from 'react-icons/ai';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useState } from 'react';
import Select from 'react-select';

import './Questions.scss';
function Questions() {
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];
	const [selectedQuiz, setSelectedQuiz] = useState({});
	return (
		<div className='question-container'>
			<div className='title'>Manage Question</div>
			<div className='add-new-question'>
				<div className='col-6 form-group'>
					<label htmlFor=''>Select Quiz: </label>
					<Select
						value={selectedQuiz}
						onChange={setSelectedQuiz}
						options={options}
					/>
				</div>
				<div className='mt-3'>Add questions:</div>

				<div>
					<div className='questions-content'>
						<div className='form-floating description'>
							<input
								type='text'
								className='form-control'
								placeholder='name@example.com'
							/>
							<label>Description</label>
						</div>
						<div className='group-upload'>
							<label
								className='label-up'
								htmlFor=''>
								Upload image
							</label>
							<input
								type='file'
								hidden
							/>
							<span>0 file is upload</span>
						</div>
						<div className='btn-add'>
							<span>
								<BiPlusCircle className='icon-add' />
							</span>
							<span>
								<AiOutlineMinusCircle className='icon-remove' />
							</span>
						</div>
					</div>
					<div className='answers-content'>
						<input
							className='form-check-input iscorrect'
							type='checkbox'
							id='flexCheckDefault'
						/>
						<div className='form-floating answer-name'>
							<input
								type='text'
								className='form-control'
								placeholder='name@example.com'
							/>
							<label>answer 1</label>
						</div>
						<div className='btn-group'>
							<span>
								<AiOutlinePlusSquare className='icon-add' />
							</span>
							<span>
								<AiOutlineMinusSquare className='icon-remove' />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Questions;
