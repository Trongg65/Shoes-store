import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'react-toastify';
import { postCreateProduct } from '../../../../services/apiServices';

const ModalCreateProduct = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName("");
        setPrice("");
        setBrand("");
        setColor("");
        setSku("");
        setDescription("");
        setPreviewImage("");
    }

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setImage(file);
        }
    };

    const handleSubmitCreateProduct = async () => {
        // Validate
        if (!name) {
            toast.error('Product name is required!');
            return;
        }
        if (!price) {
            toast.error('Price is required!');
            return;
        }
        if (!brand) {
            toast.error('Brand is required!');
            return;
        }
        if (!color) {
            toast.error('Color is required!');
            return;
        }
        if (!sku) {
            toast.error('SKU is required!');
            return;
        }
        if (!description) {
            toast.error('Description is required!');
            return;
        }
        if (!image) {
            toast.error('Product image is required!');
            return;
        }

        let res = await postCreateProduct(name, price, brand, color, sku, description, image);
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
            size="xl"
            backdrop="static"
            className='modal-add-product'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <div className="price-input">
                            <input
                                type="number"
                                className="form-control"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Color</label>
                        <input
                            type="text"
                            className="form-control"
                            value={color}
                            onChange={(event) => setColor(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">SKU</label>
                        <input
                            type="text"
                            className="form-control"
                            value={sku}
                            onChange={(event) => setSku(event.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows="3"
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label label-upload" htmlFor='labelUpload'>
                            <LuImagePlus />Upload Product Image
                        </label>
                        <input
                            type='file'
                            hidden
                            id='labelUpload'
                            onChange={(event) => handleUploadImage(event)}
                        />
                    </div>
                    <div className="col-md-12 img-preview">
                        {previewImage ?
                            <img src={previewImage} alt="Product preview" />
                            :
                            <span>Preview Image</span>
                        }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitCreateProduct}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateProduct; 