import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import TableUser from "./TableUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";


const ManageUser = (props) => {

    // const LIMIT_USER = 3;
    // const [pageCount, setPageCount] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowViewUpdateUser] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [listUsers, setListUsers] = useState([])


    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true)
        setDataDelete(user)
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true)
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setShowViewUpdateUser(true)
        setDataUpdate(user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    console.log(dataUpdate)
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">

                    <TableUser
                        listUsers={listUsers}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowViewUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />

            </div>
        </div>
    )
}

export default ManageUser;