import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalViewProduct = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
        setShow(false);
        props.resetUpdateData();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            backdrop="static"
            className='modal-view-product'
        >
            <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="product-image">
                            <img
                                src={dataUpdate.image}
                                alt={dataUpdate.name}
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-info">
                            <h3>{dataUpdate.name}</h3>
                            <div className="info-item">
                                <span className="label">Price:</span>
                                <span className="value">${dataUpdate.price}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Brand:</span>
                                <span className="value">{dataUpdate.brand}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Color:</span>
                                <span className="value">{dataUpdate.color}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">SKU:</span>
                                <span className="value">{dataUpdate.sku}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Description:</span>
                                <p className="value description">{dataUpdate.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalViewProduct; 