import Select from 'react-select';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '~/services/apiService';
function AssignQuiz(props) {
	const [selectedQuiz, setSelectedQuiz] = useState({});
	const [listQuiz, setListQuiz] = useState([]);

	const [listUser, setListUser] = useState([]);
	const [selectedUser, setSelectedUser] = useState({});

	const fetchQuiz = async () => {
		let res = await getAllQuizForAdmin();
		if (res && res.EC === 0) {
			let newQuiz = res.DT.map((item) => {
				return {
					value: item.id,
					label: `${item.id} - ${item.name}`,
				};
			});
			setListQuiz(newQuiz);
		}
	};
	const fetchUser = async () => {
		let res = await getAllUsers();
		if (res && res.EC === 0) {
			let users = res.DT.map((item) => {
				return {
					value: item.id,
					label: `${item.id} -- ${item.username} - ${item.email}`,
				};
			});
			setListUser(users);
		}
	};

	useEffect(() => {
		fetchQuiz();
		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAssign = async () => {
		let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
		if (res && res.EC === 0) {
			toast.success(res.EM);
			setSelectedQuiz({});
			setSelectedUser({});
		} else {
			toast.error(res.EM);
		}
	};
	return (
		<div className='assign-quiz-container row'>
			<div className='col-6 form-group'>
				<label
					className='mb-2'
					htmlFor=''>
					Select Quiz:
				</label>
				<Select
					value={selectedQuiz}
					onChange={setSelectedQuiz}
					options={listQuiz}
				/>
			</div>
			<div className='col-6 form-group'>
				<label
					className='mb-2'
					htmlFor=''>
					Select User:
				</label>
				<Select
					value={selectedUser}
					onChange={setSelectedUser}
					options={listUser}
				/>
			</div>
			<div className='btn btn-warning mt-3'>
				<button onClick={() => handleAssign()}>Assign</button>
			</div>
		</div>
	);
}

export default AssignQuiz;
