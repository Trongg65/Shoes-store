import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import './ModalLogout.scss'
import { doLogout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
const ModalLogout = (props) => {
    const dispatch = useDispatch();
    const { show, setShow, dataModalResult } = props;
    const navigate = useNavigate()
    const handleClose = () => setShow(false);

    const handleLogin = () => {
        dispatch(doLogout());
        navigate('/login')
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-modal-logout'>
                        <IoWarning className='icon-warning' />
                        <p> Do you really wish to leave and log out? All the unsaved changes will be lost.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLogin} className='btn-logout'>
                        Yes, log Out
                    </Button>
                    <Button variant="primary" onClick={handleClose} className='btn-cancel-logout'>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLogout