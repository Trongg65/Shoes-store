import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteProduct } from '../../../../services/apiServices';

const ModalDeleteProduct = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    }

    const handleConfirmDelete = async () => {
        let res = await deleteProduct(dataDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchListProducts();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this product: <b>{dataDelete.name}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteProduct; 