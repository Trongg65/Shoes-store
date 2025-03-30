import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { postLogin } from '../../services/apiServices';


const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hideShowPassword, setHideShowPassword] = useState(false)
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    // const validateEmail = (username) => {
    //     return String(username)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    const handleLogin = async () => {
        // //validate
        // const isValidEmail = validateEmail(username);
        // if (!isValidEmail) {
        //     toast.error('Invalid username!')
        //     return;
        // }
        // if (!password) {
        //     toast.error('Invalid password!')
        //     return;
        // }
        //submit apis
        let res = await postLogin(username, password);
        if (res && res.EC === 0) {
            // dispatch(doLogin(res))
            toast.success(res.EM);
            // setIsLoading(false)
            navigate('/')
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
            // setIsLoading(false)
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
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-md-4 mx-auto'>
                EMT
            </div>
            <div className='welcome col-md-4 mx-auto'>
                Hello, who’s this?
            </div>
            <div className='form-content col-md-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='username'
                        className='form-control'
                        placeholder='bruce@wayne.com'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <form>
                        <input
                            type={hideShowPassword === false ? 'password' : 'text'}
                            className='form-control'
                            placeholder='At least 8 characters'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <div className='eye-password-login' onClick={() => handleHideShowPassword()}>
                            {hideShowPassword === false ? <FaRegEye className='' /> : <FaRegEyeSlash />}
                        </div>
                        <span className='forgot-password'>Forgot password?</span>

                    </form>
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                    >

                        {
                            isLoading === true &&
                            <ImSpinner2 className="loader-icon" />
                        }
                        Log in to EMT
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => navigate('/')}>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login