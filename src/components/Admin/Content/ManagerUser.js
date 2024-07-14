import React, { useEffect, useState } from 'react';
import { getAllUsers } from '~/services/apiService';
import { HiUserAdd } from 'react-icons/hi';
import Button from 'react-bootstrap/Button';

import './ManageUser.scss';
import TableUser from './TableUser';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';

function ManagerUser(props) {
	const [listUsers, setListUsers] = useState([]);
	const [showModalCreateUser, setShowModalCreateUser] = useState(false);
	const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
	const [showModalViewUser, setShowModalViewUser] = useState(false);
	const [dataUpdate, setDataUpdate] = useState({});
	const [dataDelete, setDataDelete] = useState({});
	const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

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
	const handleClickBtnView = (user) => {
		setShowModalViewUser(true);
		setDataUpdate(user);
	};

	const resetupdateData = () => {
		setDataUpdate({});
	};

	const handleCLickDeleteUser = (user) => {
		setShowModalDeleteUser(true);
		setDataDelete(user);
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
						handleClickBtnView={handleClickBtnView}
						handleClickBtnUpdate={handleClickBtnUpdate}
						handleCLickDeleteUser={handleCLickDeleteUser}
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
				<ModalViewUser
					show={showModalViewUser}
					setShow={setShowModalViewUser}
					dataUpdate={dataUpdate}
					resetupdateData={resetupdateData}
				/>
				<ModalDeleteUser
					show={showModalDeleteUser}
					setShow={setShowModalDeleteUser}
					fetchListUsers={fetchListUsers}
					dataDelete={dataDelete}
				/>
			</div>
		</div>
	);
}

export default ManagerUser;
