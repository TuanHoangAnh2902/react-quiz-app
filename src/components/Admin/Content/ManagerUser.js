import React, { useEffect, useState } from 'react';
import { getAllUsers } from '~/services/apiService';
import { HiUserAdd } from 'react-icons/hi';
import Button from 'react-bootstrap/Button';

import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';

function ManagerUser(props) {
	const [listUsers, setListUsers] = useState([]);
	const [showModalCreateUser, setShowModalCreateUser] = useState(false);
	const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
	const [dataUpdate, setDataUpdate] = useState({});

	useEffect(() => {
		fetchListUsers();
	}, []);

	const fetchListUsers = async () => {
		let res = await getAllUsers();
		if (res.EC === 0) {
			setListUsers(res.DT);
		}
	};

	const handleClickBtnUpdate = (user) => {
		setShowModalUpdateUser(true);
		setDataUpdate(user);
	};

	const resetupdateData = () => {
		setDataUpdate({});
	};

	return (
		<div className='manage-user-container'>
			<div className='title'>Manage User</div>
			<div className='user-content'>
				<div>
					<Button
						className='my-4'
						variant='outline-primary'
						onClick={() => setShowModalCreateUser(true)}>
						<HiUserAdd />
						Add new user
					</Button>
				</div>
				<div className='table-user-container'>
					<TableUser
						handleClickBtnUpdate={handleClickBtnUpdate}
						listUsers={listUsers}
					/>
				</div>
				<ModalCreateUser
					show={showModalCreateUser}
					setShow={setShowModalCreateUser}
					fetchListUsers={fetchListUsers}
				/>
				<ModalUpdateUser
					show={showModalUpdateUser}
					setShow={setShowModalUpdateUser}
					dataUpdate={dataUpdate}
					fetchListUsers={fetchListUsers}
					resetupdateData={resetupdateData}
				/>
			</div>
		</div>
	);
}

export default ManagerUser;
