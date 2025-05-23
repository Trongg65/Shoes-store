import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'react-toastify';
import { postRegister } from '../../../services/apiServices';
const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setIsStaff("USER");
        setPreviewImage("");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [is_staff, setIsStaff] = useState("False");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        const file = event.target.files?.[0]; // Lấy file từ input

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl); // Hiển thị ảnh preview
            setImage(file); // Lưu file vào state
        }
        console.log(file)
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email!')
            return;
        }
        if (!password) {
            toast.error('Invalid password!')
            return;
        }
        let res = await postRegister(username, email, password, is_staff, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await props.fetchListUsers();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Is staff</label>
                            <select
                                className="form-select"
                                onChange={(event) => setIsStaff(event.target.value)}
                                value={is_staff}
                            >
                                <option value="FALSE">False</option>
                                <option value="TRUE">True</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <LuImagePlus />Upload File Image
                            </label>
                            <input
                                type='file'
                                hidden
                                id='labelUpload'
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} />
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
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalCreateUser;