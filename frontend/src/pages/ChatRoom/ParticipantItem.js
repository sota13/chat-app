import React from 'react'
import { Link } from 'react-router-dom'
import defaultAvatar from "../../assets/avatar.svg"

function ParticipantItem({id,name,avatar}) {
  return (
    <Link to={`/profile/${id}`} className="participant">
        <div className="avatar avatar--medium active">
        <img src={avatar ? avatar : defaultAvatar} />
        </div>
        <p>
        {name}
        </p>
    </Link>
  )
}

export default ParticipantItem