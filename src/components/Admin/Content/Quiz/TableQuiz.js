import { useEffect, useState } from 'react';

import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

function TableQuiz(props) {
	const { listQuiz, fetchQuiz } = props;
	const [idQuizDelete, setIdQuizDelete] = useState('');
	const [dataUpdate, setDataUpdate] = useState({});
	const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
	const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);

	useEffect(() => {
		fetchQuiz();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDeleteQuiz = async (id) => {
		setShowModalDeleteQuiz(true);
		setIdQuizDelete(id);
	};
	const handleUpdateQuiz = (item) => {
		setShowModalUpdateQuiz(true);
		setDataUpdate(item);
	};
	return (
		<>
			<div> List Quizzes: </div>
			<table className='table table-hover table-bordered my-2'>
				<ModalDeleteQuiz
					show={showModalDeleteQuiz}
					setShow={setShowModalDeleteQuiz}
					dataDelete={idQuizDelete}
					fetchQuiz={fetchQuiz}
				/>
				<ModalUpdateQuiz
					show={showModalUpdateQuiz}
					setShow={setShowModalUpdateQuiz}
					fetchQuiz={fetchQuiz}
					dataUpdate={dataUpdate}
				/>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Description</th>
						<th scope='col'>Type</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{listQuiz.map((item, index) => (
						<tr key={index}>
							<th scope='row'>{item.id}</th>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{item.difficulty}</td>
							<td>
								<button
									onClick={() => handleUpdateQuiz(item)}
									className='btn btn-primary mx-3'>
									Edit
								</button>
								<button
									onClick={() => handleDeleteQuiz(item.id)}
									className='btn btn-danger'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default TableQuiz;
