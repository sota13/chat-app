import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/auth'




function Signup() {

  const firstNameRef = useRef()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()


  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(state => state.userState);

  useEffect(() => {
    firstNameRef.current.focus()
}, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd, firstName, lastName])

  useEffect(() => {
    if (isAuthenticated) {

      navigate('/')
    }
  }, [isAuthenticated])

  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        dispatch(register({first_name:firstName, last_name:lastName, email, password:pwd }))
        setEmail('')
        setPwd('')
        
    } catch (err) {
        setErrMsg('Register Failed');
        console.log(err)
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value)
  
  const handleFirstName = (e) => setFirstName(e.target.value)
  
  const handleLastName = (e) => setLastName(e.target.value)

  const handlePwdInput = (e) => setPwd(e.target.value)

  return (

        <div className="auth-layout__box signupBox scroll">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Sign up</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Find your chat partner</h2>

            <form className="form" onSubmit={handleSubmit}>

              <div className="form__group">
                <label htmlFor="first_name">First Name</label>
                <input 
                  id="first_name" 
                  name="first_name" 
                  type="text" 
                  placeholder="e.g. Mohammed"
                  value={firstName}
                  onChange={handleFirstName}
                  required 
                  ref={firstNameRef}
                />
              </div>
              <div className="form__group">
                <label htmlFor="last_name">Last Name</label>
                <input 
                  id="last_name" 
                  name="last_name" 
                  type="text" 
                  placeholder="e.g. Taha"
                  value={lastName}
                  onChange={handleLastName}
                  required
                />
              </div>

              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="e.g. taha@gmail.com"
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

                Sign Up
              </button>
            </form>

            <div className="auth__action">
              <p>Already have an account?</p>
              <Link to='/login' className="btn btn--link">Log In</Link>
            </div>
          </div>
        </div>

  )
}

export default Signup