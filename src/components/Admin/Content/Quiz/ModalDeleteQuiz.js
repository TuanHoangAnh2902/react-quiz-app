import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizById } from '~/services/apiService';

function ModalDeleteQuiz(props) {
	const { show, setShow, dataDelete, fetchQuiz } = props;

	const handleClose = () => setShow(false);

	const handleConfirmDeleteQuiz = async () => {
		let data = await deleteQuizById(dataDelete);
		if (data && data.EC === 0) {
			toast.success(data.EM);
			handleClose();
			await fetchQuiz();
		}
		if (data && data.EC !== 0) {
			toast.error(data.EM);
		}
	};
	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete Quiz?</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure to delete this quiz</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant='primary'
						onClick={() => handleConfirmDeleteQuiz()}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalDeleteQuiz;
