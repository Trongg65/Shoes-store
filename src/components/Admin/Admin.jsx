import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item >Log out </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
export default Admin;