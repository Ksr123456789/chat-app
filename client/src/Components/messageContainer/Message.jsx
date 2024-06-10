import React from 'react'
import {useAuthContext} from "../../Context/AuthContext"

const Message = ({message}) => {

  const {authenticatedUser, selectedUser} = useAuthContext();
  const fromMe = message.senderId === authenticatedUser._id;
  const chatClassName = fromMe ? `chat-end` : `chat-start`;
  const profilePic = fromMe ? authenticatedUser.profilePic : selectedUser?.profilePic;
  const bubbleBgColor = fromMe ? `bg-blue-500` : `bg-gray-200`;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
       <div className='w-10 rounded-full'>
         <img src={`${profilePic}`} alt="tailwind css chat bubble component" />
       </div>
      </div>
      <div className={`chat-bubble text-black bg-blue-500 ${bubbleBgColor}`}>{message.message}</div>
      
    </div>
  )
}

export default Message






