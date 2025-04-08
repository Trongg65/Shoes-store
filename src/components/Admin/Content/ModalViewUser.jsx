import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash'

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setUsername("");
        setEmail("");
        setPassword("");
        setIsStaff("False");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData()
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [is_staff, setIsStaff] = useState("False");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword();
            setUsername(dataUpdate.username);
            setIsStaff(dataUpdate.is_staff);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitUpdateUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email!')
            return;
        }

        let res = await putUpdateUser(dataUpdate.id, username, role, image);
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
                    <Modal.Title>View a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                disabled
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
                                disabled
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
                            <label className="form-label">is_staff</label>
                            <select
                                className="form-select"
                                onChange={(event) => setIsStaff(event.target.value)}
                                value={is_staff}
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
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
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewUser;