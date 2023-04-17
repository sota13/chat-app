import React from 'react'
import defaultAvatar from "../../assets/avatar.svg"
import { formatTimestamp } from '../../utils/general'
import { Link } from 'react-router-dom'

function ActivityItem({author, room, content, timestamp,id, handleDeleteActivity, userProfile}) {
  return (
    <div className="activities__box">
      <div className="activities__boxHeader roomListRoom__header">
          <div href="profile.html" className="roomListRoom__author">
          <div className="avatar2 avatar--small">
              <img src={author.avatar ? author.avatar : defaultAvatar} />
          </div>
          <p>
              {author.name}
              <span>{formatTimestamp(timestamp)}</span>
          </p>
          </div>
          {!userProfile &&
          <div className="roomListRoom__actions">
          <button onClick={()=>handleDeleteActivity(id)}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>remove</title>
              <path
                  d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
              ></path>
              </svg>
          </button>
          </div>}
      </div>
      <div className="activities__boxContent">
      <Link to={`/chat-room/${room.id}`}><p>{room.name}</p></Link>
          <div className="activities__boxRoomContent">
          {content}
          </div>
      </div>
      </div>
  )
}

export default ActivityItem