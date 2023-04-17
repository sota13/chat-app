import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { validImage } from '../../utils/validators';
import { useEditProfileMutation } from '../../redux/features/profileSlice';

function UpdateProfile() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarErrorMsg, setAvatarErrorMsg] = useState('');


  const { user  } = useSelector(state => state.userState);

  const [editProfile, {isLoading}  ] = useEditProfileMutation();


  const navigate = useNavigate();

  useEffect(()=>{
    if (user?.id) {
      setFirstName(user.profile.first_name);
      setLastName(user.profile.last_name);
      setBio(user.profile.bio);
      console.log(user)
    }
  }, []);


  const avatarHandler = (e) => {
    if (e.target.files[0]) {
      if (validImage(e.target.files[0]?.name)) {
        console.log('valid image')
        if (avatarErrorMsg) {
            setAvatarErrorMsg('')
        }
        setAvatar(e.target.files[0]);
        } else {
          setAvatarErrorMsg('not soportet image extention');
        }
      }
    };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarErrorMsg){
      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('bio', bio);
      if(avatar) {
        formData.append('avatar', avatar);
      }
      try {
        await editProfile(formData).unwrap()
        setFirstName('')
        setLastName('')
        setBio('')
        setAvatar('')
        navigate('/')

      } catch (err) {
          console.error('Failed to save the changes', err)
      }
   }

  };


  return (
    <>{isLoading ? <p>loading...</p> :

              <div className="update-box-layout">
                <div className="layout__boxHeader">
                      <div className="layout__boxTitle">
                          <Link to={-1} >
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                  viewBox="0 0 32 32">
                                  <title>arrow-left</title>
                                  <path
                                      d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                                  </path>
                              </svg>
                          </Link>
                          <h3>Edit your profile</h3>
                      </div>
                  </div>
                  
                  <div className="layout__body scroll">
                      <form className="form" onSubmit={handleSubmit}>
                          <div className="form__group">
                              <label htmlFor="profile_pic">Avatar</label>
                              <input 
                                id="profile_pic" 
                                name="profile_pic" 
                                type="file"
                                onChange={avatarHandler}
                              />
                          </div>

                          <div className="form__group">
                              <label htmlFor="first_name">First Name</label>
                              <input 
                                id="first_name" 
                                name="first_name" 
                                type="text" 
                                placeholder="E.g. Sultan"
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                          </div>

                          <div className="form__group">
                              <label htmlFor="last_name">Last Name</label>
                              <input 
                                id="last_name" 
                                name="last_name" 
                                type="text" 
                                placeholder="E.g. Taha" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                              />
                          </div>


                          <div className="form__group">
                              <label htmlFor="bio">Bio</label>
                              <textarea 
                                name="bio" 
                                id="bio" 
                                placeholder="Write about yourself..."
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)}
                              />
                          </div>

                          <div className="form__action">
                              <Link to={-1} className="btn btn--dark" >Cancel</Link>
                              <button className="btn btn--main" type="submit">Update</button>
                          </div>
                      </form>
                  </div>
              </div>

      }
    </>
  )
}

export default UpdateProfile