import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth'



const isLoading = false

const Login = () => {
    const emailRef = useRef()
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(state => state.userState);

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    useEffect(() => {
      if (isAuthenticated) {

        navigate('/')
      }
    }, [isAuthenticated])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            dispatch(login({ email, password:pwd }))
            // dispatch(setCredentials(userData))
            setEmail('')
            setPwd('')
            
        } catch (err) {
            setErrMsg('Login Failed');
            console.log(err)
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)


    return (
        <>
        {isLoading ? <h1>Loading...</h1> :

                <div className="auth-layout__box">
                <div className="layout__boxHeader">
                    <div className="layout__boxTitle">
                    <h3>Login</h3>
                    </div>
                </div>
                <div className="layout__body">
                    <h2 className={errMsg ? "auth__tagline errmsg" : "auth__tagline"}>
                    {errMsg ? errMsg : "Find your chat partner"}
                    </h2>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form__group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="e.g. taha@gmail.com"
                                ref={emailRef}
                                value={email}
                                onChange={handleEmailInput}
                                required
                            />
                        </div>
                        <div className="form__group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={pwd}
                                onChange={handlePwdInput}
                                required
                            />
                        </div>

                        <button className="btn btn--main" type="submit">
                            <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            >
                            <title>lock</title>
                            <path
                                d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"
                            ></path>
                            <path
                                d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"
                            ></path>
                            </svg>

                            Login
                        </button>
                    </form>

                    <div className="auth__action">
                        <div className='login__action'>
                            <p>Haven't signed up yet?</p>
                            <Link to="/signup" className="btn btn--link">Sign Up</Link>
                        </div>
                        <div className='login__action'>
                            <p>Forgot Password</p>
                            <Link to="/forgot-password" className="btn btn--link">Reset Password</Link>
                        </div>
                    </div>
                </div>
                </div>

        }
        </>
    )
}
export default Login