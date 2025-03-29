import React from "react"
import './Header.css';
import SearchBar from "./SearchBar";
import {SearchResultsList} from './SearchResultsList'
import { useState } from "react";
function Header() {
    const [results, setResults] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn không cho form reload
        console.log('Tìm kiếm:', searchInput);
      };
    return (
        <>
        <header className="container p-2 d-flex">
            <nav className="navbar navbar-expand-lg navbar-light" style={{ width: "100%" }}>
                <a className="navbar-brand d-none d-lg-block me-3" href="">
                    <img className="mx-4" style={{ width: '50px' }}
                        src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                        alt=""></img>
                </a>
 
                <button className="button-color border-0 d-lg-none ">
                    <svg className="bi bi-chevron-left text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </button>
 
                <button className="navbar-toggler mx-3 border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <SearchBar setResults={setResults} />
                {results && results.length > 0 && <SearchResultsList results={results} />}

                <button className="button-color border-0 d-lg-none ">
                    <svg
                        className="text-white "
                        style={{ width: "40px", height: "30px" }}
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </button>
 
                <div className="header-icons d-lg-flex d-none">
                    <a href="#" className="home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                        Trang chủ</a>
                    <a href="#" class="account">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                        Tài khoản</a>
                    <a href="#" className="cart border-0 border-start mx-5">
                        <img
                            src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                            alt="Cart" />
                        <span class="cart-count">99+</span>
                    </a>
                </div>
            </nav>
 
        </header>
        <div className=" d-lg-none bg-white">
                        <div className="d-flex justify-content-around">
                            <a className="text-decoration-none mx-2" href="">Phổ biến </a>
                            <svg style={{ marginTop: "10px" }} className="text-secondary bi bi-circle-fill svg" xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
 
                            <a className="text-decoration-none mx-2 text-dark" href="">Bán chạy </a>
                            <svg style={{ marginTop: "10px" }} className="text-secondary bi bi-circle-fill svg" xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
 
                            <a className="text-decoration-none mx-2 text-dark" href="">Hàng mới</a>
                            <svg className="text-secondary bi bi-circle-fill svg" xmlns="http://www.w3.org/2000/svg" width="5" height="5" fill="currentColor" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8" />
                            </svg>
 
                            <a className="text-decoration-none text-dark" href="">Giá
                                <svg className="bi bi-arrow-down-up mx-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </a>
                        </div>
                        <hr />
                        <div className="my-1">
                            <button className="border-0 bg-bg-white">
                                <svg
                                    className="bi bi-funnel mb-2"
                                    style={{ width: "30px", height: "20px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                                </svg>
                                Lọc
                            </button>
                        </div>
                    </div>
        <div className="container d-none d-lg-block">
            <div className="d-flex">
            <p className="text-secondary">Trang chủ 〉</p>
            <p>Nhà sách Tiki</p>
            </div>
        </div>
        </>
 
    );
}
export default Header