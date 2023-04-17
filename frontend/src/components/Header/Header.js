import React, { Fragment, useState } from 'react';
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useVisible from '../../hooks/useVisible';
import avatar from "../../assets/avatar.svg"
import { logout } from '../../redux/features/userSlice';
import SearchResultModal from '../SearchResultModal/SearchResultModal';

function Header() {

  const { user, isAuthenticated } = useSelector(state => state.userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ref, isVisible, setIsVisible } = useVisible(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDropdownContent = () => {
    setIsVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log('hi');
    try {
      dispatch(logout());
      console.log('successfuly loged out!');
    } catch (err) {
      console.error(err);
    }

  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      console.log('do validate')
      setModalIsOpen(true)
    }
  }

  return (
    <Fragment>
    <SearchResultModal isOpen={modalIsOpen} handleClose={()=> setModalIsOpen(false)}/>
    <header className="header header--loggedIn">
      <div className="container">
        <a href="/" className="header__logo">
          <img src={logo} />
          <h1>WeChat</h1>
        </a>
        {/* {isAuthenticated ? <form className="header__search">
          <label>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>search</title>
              <path
                d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"
              ></path>
            </svg>
            <input type='search' onKeyDown={handleKeyDown} placeholder="Search for rooms..." />
          </label>
        </form> : null } */}
        <nav className="header__menu">
          {!isAuthenticated ?
            <div className='header__menu__box'>
              <img src={avatar} />
              <Link to='/login'><span>Login</span></Link>
          </div>
            :
           <div className='header__menu__box'>
            <div className='header-user-info'>
              <div className="avatar avatar--medium active">
                <img src={user?.profile.avatar ? user?.profile.avatar : avatar} />
              </div>
              <span onClick={()=> navigate(`profile/${user.id}`)}>{user?.profile.first_name}</span>
            </div>

            <button className='header-btn' onClick={handleDropdownContent} ref={ref}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>chevron-down</title>
                <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
              </svg>

              <div className="header-user-dropdown" >
                <div
                  className={`header-user-dropdown__content ${
                    isVisible ? "show-content" : ""
                  }`}
                >
                   <div
                    onClick={() => {
                      navigate(`/profile/${user.id}`);
                    }}
                    className="dropdown-item"
                  >
                    <i className="fa-solid fa-id-badge"></i>My profile
                  </div>

                  {user.is_admin? <div
                    onClick={() => {
                      navigate(`/profile/${user.id}`);
                    }}
                    className="dropdown-item"
                  >
                    <i className="fab fa-sketch"></i>Dashboard
                  </div> : null}

                  <div
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>Logout
                  </div>
                </div>
            </div>

            </button>
            
          </div>}

        </nav>
      </div>
    </header>
    </Fragment>
  )
}

export default Header