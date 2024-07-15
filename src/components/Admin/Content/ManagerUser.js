import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserWidthPaginate } from '~/services/apiService';
import { HiUserAdd } from 'react-icons/hi';
import Button from 'react-bootstrap/Button';

import './ManageUser.scss';
import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

function ManagerUser() {
	const LIMIT_USER = 6;
	const [currentPage, setCurrentPage] = useState(1);
	const [listUsers, setListUsers] = useState([]);
	const [dataUpdate, setDataUpdate] = useState({});
	const [dataDelete, setDataDelete] = useState({});
	const [pageCount, setPageCount] = useState(0);
	const [showModalCreateUser, setShowModalCreateUser] = useState(false);
	const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
	const [showModalViewUser, setShowModalViewUser] = useState(false);
	const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

	useEffect(() => {
		// fetchListUsers();
		fetchListUserWidthPaginate(currentPage);
	}, [currentPage]);

	const fetchListUsers = async () => {
		let res = await getAllUsers();
		if (res.EC === 0) {
			setListUsers(res.DT);
		}
	};

	const fetchListUserWidthPaginate = async (page) => {
		let res = await getUserWidthPaginate(page, LIMIT_USER);
		if (res.EC === 0) {
			console.log(res.DT);
			setListUsers(res.DT.users);
			setPageCount(res.DT.totalPages);
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
					{/* <TableUser
						handleClickBtnView={handleClickBtnView}
						handleClickBtnUpdate={handleClickBtnUpdate}
						handleCLickDeleteUser={handleCLickDeleteUser}
						listUsers={listUsers}
					/> */}
					<TableUserPaginate
						listUsers={listUsers}
						handleClickBtnView={handleClickBtnView}
						handleClickBtnUpdate={handleClickBtnUpdate}
						handleCLickDeleteUser={handleCLickDeleteUser}
						fetchListUsers={fetchListUsers}
						fetchListUserWidthPaginate={fetchListUserWidthPaginate}
						pageCount={pageCount}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
				<ModalCreateUser
					show={showModalCreateUser}
					setShow={setShowModalCreateUser}
					fetchListUsers={fetchListUsers}
					fetchListUserWidthPaginate={fetchListUserWidthPaginate}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<ModalUpdateUser
					show={showModalUpdateUser}
					setShow={setShowModalUpdateUser}
					dataUpdate={dataUpdate}
					fetchListUsers={fetchListUsers}
					fetchListUserWidthPaginate={fetchListUserWidthPaginate}
					resetupdateData={resetupdateData}
					currentPage={currentPage}
				/>
				<ModalViewUser
					show={showModalViewUser}
					setShow={setShowModalViewUser}
					dataUpdate={dataUpdate}
					resetupdateData={resetupdateData}
					fetchListUsers={fetchListUsers}
				/>
				<ModalDeleteUser
					show={showModalDeleteUser}
					setShow={setShowModalDeleteUser}
					fetchListUsers={fetchListUsers}
					fetchListUserWidthPaginate={fetchListUserWidthPaginate}
					dataDelete={dataDelete}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
}

export default ManagerUser;
