import { HiUserAdd } from 'react-icons/hi';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import TableUser from './TableUser';

function ManagerUser(props) {
	const [showModalCreateUser, setShowModalCreateUser] = useState(false);
	return (
		<div className='manage-user-container'>
			<div className='title'>Manage User</div>
			<div className='user-content'>
				<div>
					<Button
						variant='outline-primary'
						onClick={() => setShowModalCreateUser(true)}>
						<HiUserAdd />
						Add new user
					</Button>
				</div>
				<div className='table-user-container'>
					<TableUser />
				</div>
				<ModalCreateUser
					show={showModalCreateUser}
					setShow={setShowModalCreateUser}
				/>
			</div>
		</div>
	);
}

export default ManagerUser;
