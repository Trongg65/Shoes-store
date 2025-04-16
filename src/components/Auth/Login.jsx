import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { postLogin } from '../../services/apiServices';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/slices/authSlice';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Logo from '../../assets/Poster1.png'; // Thêm logo của bạn vào đây

// Cấu hình NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    easing: 'ease',
    speed: 500
});

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hideShowPassword, setHideShowPassword] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    // const validateEmail = (username) => {
    //     return String(username)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    const handleLogin = async () => {
        if (!username) {
            toast.error('Please enter username');
            return;
        }
        if (!password) {
            toast.error('Please enter password');
            return;
        }

        setIsLoading(true);
        NProgress.start();
        try {
            //submit apis
            let res = await postLogin(username, password);
            if (res && res.EC === 0) {
                dispatch(doLogin(res));
                toast.success(res.EM);
                navigate('/')
            }
            if (res && +res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error('An error occurred during login');
        } finally {
            setIsLoading(false);
            NProgress.done();
        }
    }

    const handleHideShowPassword = () => {
        setHideShowPassword(!hideShowPassword)
    }

    const handleKeyDown = (e) => {
        console.log('check: ', e.key, e)
        if (e && e.key === 'Enter') {
            e.preventDefault();
            handleLogin()
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className='login-header'>
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2>Welcome Back!</h2>
                    <p>Please sign in to continue</p>
                </div>

                <div className='login-form'>
                    <div className='form-group'>
                        <div className="input-group">
                            <span className="input-icon">
                                <FaUser />
                            </span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className="input-group">
                            <span className="input-icon">
                                <FaLock />
                            </span>
                            <input
                                type={hideShowPassword ? 'text' : 'password'}
                                className='form-control'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <span 
                                className='password-toggle'
                                onClick={handleHideShowPassword}
                            >
                                {hideShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <span className="forgot-password">Forgot password?</span>
                    </div>

                    <button
                        className='login-button'
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ImSpinner2 className="loader-icon" />
                        ) : 'Sign In'}
                    </button>

                    <div className='register-link'>
                        Don't have an account? 
                        <span onClick={() => navigate('/register')}> Sign up</span>
                    </div>

                    <div className='back-link'>
                        <span onClick={() => navigate('/')}>Back to Homepage</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login