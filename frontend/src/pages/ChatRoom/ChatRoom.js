import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import Participants from "./Participants";
import Conversation from "./Conversation";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSelector } from 'react-redux'
import { messages } from '../../assets/data/messages'
import { useRoomPageQuery } from "../../redux/features/roomSlice";



const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;



function ChatRoom() {
  
  const {room_id} = useParams()

  // const {
  //   data: room,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useRoomPageQuery(room_id);


  const { user  } = useSelector(state => state.userState);

  const [messageHistory, setMessageHistory] = useState([])
  const [participants, setParticipants] = useState([])
  const [typing, setTyping] = useState(false);
  const [showMembers, setShowMembers] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  

  const { readyState, sendJsonMessage } = useWebSocket(`${SOCKET_URL}/chat/${room_id}/`,
  {
    queryParams: {
      token: user ? user.token.access : "",
    },
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    // onMessage handler
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "room_details":
          setMessageHistory(data.room.last_messages)
          setParticipants(data.room.participants)
          setIsLoading(false)
          console.log(data)
          break;
        case "chat_message_echo":
          setMessageHistory((prev) => [ ...prev, data.message]);
          // sendJsonMessage({
          //   type: "read_messages",
          // });
          console.log(data)
          break;
        case "user_join":
          setParticipants((prev) => {
            // check if the user already exist
            let user_id = prev.find(us => us.id === data.user.id)
            console.log(user_id)
            if (!user_id) {
              console.log(prev)
              return [...prev, data.user];
            }
            return prev;
          });
          console.log(data)
          break;
        case "user_leave":
          setParticipants((prev) => {
            const newParticipanta = prev.filter((ps) => ps.id !== data.user_id);
            return newParticipanta;
          });
          console.log(data)
          break;
        case "typing":
          updateTyping(data);
          break;
        default:
          console.error("Unknown message type!");
          console.log(e)
          break;
      }
    },
  }
  );


  // useEffect(()=>{
  //   if (room?.id) {
  //     setMessageHistory(room?.last_messages)
  //     setParticipants(room?.participants)
  //   }
  // },[room])

    
    
  
  
  
  const toggleMemberContainer = () => {
          setShowMembers(prev => !prev)
    }

  const updateTyping =(event) => {
    if (event.user !== user.id) {
      setTyping(event.typing);
    }
  }

    

  return (
      <main className="chat-room-layout">
          <div className="chat-room-container">
              <Conversation sendJsonMessage={sendJsonMessage} messageHistory={messageHistory} isLoading={isLoading}/>
              <Participants participants={participants} isLoading={isLoading}/>
          </div>
      </main>
  )
}

export default ChatRoom