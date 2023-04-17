import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Message from './Message'
import MyMessage from './MyMessage'
import WrapedSpinner from '../../components/Spinner/WrapedSpinner'



function Conversation({messageHistory, sendJsonMessage, isLoading}) {


  const navigate = useNavigate()
  const {room_id} = useParams()

  
  const [message, setMessage] = useState("");

  const scrollRef = useRef();
  

  useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageHistory]);
  


  

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.length === 0) return;
    if (message.length > 512) return;
    sendJsonMessage({
      type: "chat_message",
      data:{
        content:message,
        room_id,
      }
    });
    setMessage("");
    // clearTimeout(timeout.current);
    // timeoutFunction();
  };

  return (
    <div className="room  scroll">
      {isLoading ? <WrapedSpinner/> :
      <>
          <div className="room__top">
            <div className="room__topLeft">
              <button onClick={()=>navigate(-1)}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </button>
              <h3>Chat Room</h3>
            </div>

           

             <button className="action-button" data-id="120" data-delete-url="https://randomuser.me/api/3324923"
            data-edit-url="profile.html">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>ellipsis-horizontal</title>
              <path
                d="M16 7.843c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 1.98c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z">
              </path>
              <path
                d="M16 19.908c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 14.046c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z">
              </path>
              <path
                d="M16 31.974c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 26.111c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z">
              </path>
            </svg>
          </button> 
          </div>
          <div className="room__box">
            <div className="room__conversation">
              <div className="threads" >
                {messageHistory?.map(msg=>{
                  if(msg.fromMe) {
                    return (
                      <div ref={scrollRef} key={msg.id}>
                        <MyMessage  {...msg}/>
                      </div>

                    )
                  }else{
                    return (
                      <div ref={scrollRef} key={msg.id} >
                        <Message {...msg} /> 
                      </div>)
                  }
                })}
              </div>
            </div>
          </div>
          <div className="room__message">
            <form onSubmit={handleSubmit}>
                <input onChange={(e)=>setMessage(e.target.value)} value={message} placeholder="Write your message here..." />
                <button type='submit'><i className="fa-solid fa-paper-plane"></i></button>
            </form>
          </div>
      </>
      }
    </div>
  )
}

export default Conversation