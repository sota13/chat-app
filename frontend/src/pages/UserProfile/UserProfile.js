import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import defaultAvatar from "../../assets/avatar.svg"
import { useUserLastMessagesQuery } from '../../redux/features/profileSlice';
import Message from '../ChatRoom/Message';
import ActivityItem from '../Home/ActivityItem';

function UserProfile() {
  const { user_id } = useParams();

  const { user  } = useSelector(state => state.userState);

  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error
  } = useUserLastMessagesQuery()

  return (
    <>
    { isLoading ? <p>loading</p> :
      <main className="profile-page scroll">

      <div className="container">

          <div className="profile">
            <div className="profile__avatar">
              <div className="avatar avatar--large active">
                <img src={user.profile.avatar ? user.profile.avatar : defaultAvatar} />
              </div>
            </div>
            <div className="profile__info">
              <h3>{user.first_name} {user.last_name}</h3>
              {user_id == user.id ?
                <Link to={`/update-profile/${user.id}`} className="btn btn--main btn--pill">Edit Profile</Link>
              : null}
            </div>
            <div className="profile__about">
              <h3>About</h3>
              <p>
                {user.bio ? user.bio : `Hey I'm ${user.name}`}
              </p>
            </div>
          </div>
          <div className="profile-groups__header">
            <div>
              <h2>My Last Activities</h2>
            </div>
          </div>
          {messages.map(msg=>(
            <ActivityItem userProfile key={msg.id} {...msg} />
          ))}

          
        </div>

      </main>
    }
   </>
  )
}

export default UserProfile