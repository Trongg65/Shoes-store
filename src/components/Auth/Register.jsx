import { useState } from 'react'
import './Register.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { postRegister } from '../../services/apiServices';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Cấu hình NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    easing: 'ease',
    speed: 500
});

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hideShowPassword, setHideShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async () => {
        // Validate
        if (!username) {
            toast.error('Please enter username');
            return;
        }
        if (!email) {
            toast.error('Please enter email');
            return;
        }
        if (!password) {
            toast.error('Please enter password');
            return;
        }

        // Set default values
        const is_staff = false;
        const image = "";

        setIsLoading(true);
        NProgress.start();
        try {
            // Submit to API
            let res = await postRegister(username, email, password, is_staff, image);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                navigate('/login')
            }
            if (res && +res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error('An error occurred during registration');
        } finally {
            setIsLoading(false);
            NProgress.done();
        }
    }

    const handleHideShowPassword = () => {
        setHideShowPassword(!hideShowPassword)
    }
    return (
        <div className="register-container">
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
            </div>
            <div className='title col-md-4 mx-auto'>
                EMT
            </div>
            {/* <div className='welcome col-md-4 mx-auto'>
                Get better data with conversational forms, surveys, quizzes & more.
            </div> */}
            <div className='form-content col-md-4 mx-auto'>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <form>
                        <input
                            type={hideShowPassword === false ? 'password' : 'text'}
                            className='form-control'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='eye-password-register' onClick={() => handleHideShowPassword()}>
                            {hideShowPassword === false ? <FaRegEye className='' /> : <FaRegEyeSlash />}
                        </div>
                    </form>
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                        disabled={isLoading}
                    >
                        {isLoading && <ImSpinner2 className="loader-icon" />}
                        Create my free account
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register