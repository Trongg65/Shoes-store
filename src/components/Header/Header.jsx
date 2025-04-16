import './Header.scss';
import SearchBar from "./SearchBar";
import { SearchResultsList } from './SearchResultsList'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaUser, FaShoppingCart, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import ModalLogout from "./ModalLogout";

function Header({ onSearch }) {
    const { account, isAuthenticated } = useSelector(state => state.auth);
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);

    const handleBackHome = () => {
        navigate('/');
        setIsMobileMenuOpen(false);
    }

    const handleLogin = () => {
        navigate('/login');
        setIsMobileMenuOpen(false);
    }
    
    const handleChangeAdmin = () => {
        navigate('/admin');
        setIsMobileMenuOpen(false);
    }

    const handleLogout = () => {
        setIsShowModalResult(true);
        setIsMobileMenuOpen(false);
    }

    const handleCartClick = () => {
        navigate('/cart');
        setIsMobileMenuOpen(false);
    }

    const handleProfileClick = () => {
        navigate('/profile');
        setIsMobileMenuOpen(false);
    }
    
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                        <Link to="/" className="logo" onClick={handleBackHome}>
                            <img 
                            src="https://clipartcraft.com/images/spiderman-clipart-logo-1.png"
                                alt="SpiderSneaker Logo"
                            />
                            <span className="logo-text">SpiderSneaker</span>
                        </Link>
                    </div>
                    
                    <div className="header-center">
                        <SearchBar setResults={setResults} onSearch={onSearch} />
                        {results && results.length > 0 && <SearchResultsList results={results} />}
                    </div>
                    
                    <div className="header-right">
                        <div className="header-actions desktop-actions">
                            <Link to="/" className="action-button">
                                <FaHome className="action-icon" />
                                <span className="action-text">Trang chủ</span>
                            </Link>
                            
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="action-button">
                                        <FaUser className="action-icon" />
                                        <span className="action-text">{account.username}</span>
                                    </Link>
                                    {account.is_staff && (
                                        <Link to="/admin" className="action-button">
                                            <FaHome className="action-icon" />
                                            <span className="action-text">Admin</span>
                                        </Link>
                                    )}
                                    <button className="logout-button" onClick={handleLogout}>
                                        <FaSignOutAlt className="logout-icon" />
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="action-button">
                                    <FaUser className="action-icon" />
                                    <span className="action-text">Tài khoản</span>
                                </Link>
                            )}
                            
                            <Link to="/cart" className="action-button">
                                <div className="cart-container">
                                    <FaShoppingCart className="action-icon" />
                                    <span className="action-text">Giỏ hàng</span>
                                    {cartQuantity > 0 && (
                                        <span className="cart-badge">{cartQuantity}</span>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <button 
                        className="mobile-menu-button" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                <div className="mobile-search">
                    <SearchBar setResults={setResults} onSearch={onSearch} />
                    {results && results.length > 0 && <SearchResultsList results={results} />}
                </div>

                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu-items">
                            {account.is_staff ? (
                                <button className="menu-item" onClick={handleChangeAdmin}>
                                    <FaHome className="menu-icon" />
                                    <span>Admin</span>
                                </button>
                            ) : (
                                <button className="menu-item" onClick={handleBackHome}>
                                    <FaHome className="menu-icon" />
                                    <span>Trang chủ</span>
                                </button>
                            )}
                            
                            {isAuthenticated ? (
                                <>
                                    <button className="menu-item" onClick={handleProfileClick}>
                                        <FaUser className="menu-icon" />
                                        <span>{account.username}</span>
                                    </button>
                                    <button className="menu-item logout" onClick={handleLogout}>
                                        <FaSignOutAlt className="menu-icon" />
                                        <span>Đăng xuất</span>
                                    </button>
                                </>
                            ) : (
                                <button className="menu-item" onClick={handleLogin}>
                                    <FaUser className="menu-icon" />
                                    <span>Tài khoản</span>
                                </button>
                            )}
                            
                            <button className="menu-item" onClick={handleCartClick}>
                                <div className="cart-container">
                                    <FaShoppingCart className="menu-icon" />
                                    <span>Giỏ hàng</span>
                                    {cartQuantity > 0 && (
                                        <span className="cart-badge">{cartQuantity}</span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </header>
            <ModalLogout
                show={isShowModalResult}
                setShow={setIsShowModalResult}
            />
        </>
    );
}

export default Header;