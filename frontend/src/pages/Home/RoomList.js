import React from 'react'
import { Link } from 'react-router-dom'
import { roomsList } from '../../assets/data/rooms'
import RoomItem from '../../components/RoomItem/RoomItem'
import MobileMenu from './MobileMenu'
import WrapedSpinner from '../../components/Spinner/WrapedSpinner'

function RoomList({setModalIsOpen, rooms, isLoading}) {
  return (
    <div className="roomList scroll-home">
          {/* <MobileMenu/> */}
          <div className="roomList__header">
            <div>
              <h2>Chat Room</h2>
              <p>7,439 Rooms available</p>
            </div>
            <button onClick={()=>setModalIsOpen(true)} className="btn btn--main">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>add</title>
                <path
                  d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"
                ></path>
              </svg>
              Create Room
            </button>
          </div>
          {isLoading ?
          <WrapedSpinner/> :
           rooms?.map(room => (
            <RoomItem
            key={room.id}
            {...room}
            />
          ))}
        </div>
  )
}

export default RoomList