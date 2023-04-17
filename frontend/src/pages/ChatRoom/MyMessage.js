import React from 'react'
import { Link } from 'react-router-dom'
import { formatTimestamp } from '../../utils/general'

function MyMessage({author, content, timestamp}) {
  return (
    <div className="thread-mine">
        <div className="thread__top">
        <div className="thread__author">
            <Link to={`/private-chat/${author.id}`} className="thread__authorInfo">
            <span>{author.name}</span>
            </Link>
            
        </div>
        <span className="thread__date">{formatTimestamp(timestamp)}</span>
        </div>
        <div className="thread__details">
        {content}
        </div>
    </div>
  )
}

export default MyMessage