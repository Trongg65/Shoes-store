import React from "react"
import './Header.css';
import SearchBar from "./SearchBar";
import { SearchResultsList } from './SearchResultsList'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import ModalLogout from "./ModalLogout";


function Header() {
    const { account, isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [results, setResults] = useState([]);
    const [isShowModalResult, setIsShowModalResult] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn không cho form reload
        console.log('Tìm kiếm:', searchInput);
    };

    const handleBackHome = () => {
        navigate('/')
    }

    const handleLogin = () => {
        navigate('/login')
    }
    const handleChangeAdmin = () => {
        navigate('/admin')
    }

    const handleLogout = () => {
        setIsShowModalResult(true)
    }
    return (
        <>
            <header className="container p-2 d-flex">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ width: "100%" }}>
                    <a className="navbar-brand d-none d-lg-block me-3" href="" onClick={() => handleBackHome()}>
                        <img className="mx-4" style={{ width: '50px' }}
                            src="https://clipartcraft.com/images/spiderman-clipart-logo-1.png"
                            alt=""></img>
                    </a>



                    <button className="navbar-toggler mx-3 border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} />}

                    <button className="button-color border-0 d-lg-none ">
                        <svg
                            className="text-white bi bi-cart"
                            style={{ width: "40px", height: "30px" }}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </button>

                    <div className="header-icons d-lg-flex d-none">
                        {account.is_staff ?
                            <a className="home" onClick={() => handleChangeAdmin()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                </svg>
                                Admin
                            </a>
                            :
                            <a className="home">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                </svg>
                                Trang chủ
                            </a>
                        }
                        {isAuthenticated ?
                            <a className="account" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                <span >{account.username}</span>
                                <IoIosLogOut className="icon-logout" onClick={() => handleLogout()} />
                            </a>
                            :
                            <a className="account" onClick={() => handleLogin()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                Tài khoản
                            </a>
                        }
                        <a href="#" className="cart border-0 border-start mx-5">
                            <img
                                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                alt="Cart" />
                            <span className="cart-count">99+</span>
                        </a>
                    </div>
                </nav>

            </header>

            <div className="container d-none d-lg-block">
                <div className="d-flex">
                    <p className="text-secondary">Trang chủ 〉</p>
                    <p>Nhà sách Tiki</p>
                </div>
            </div>
            <ModalLogout
                show={isShowModalResult}
                setShow={setIsShowModalResult}
            />
        </>

    );
}
export default Header