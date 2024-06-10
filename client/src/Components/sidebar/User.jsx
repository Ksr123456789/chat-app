import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { useSocketContext } from '../../Context/SocketContext';


const User = ({user}) => {


  const {selectedUser, setSelectedUser} = useAuthContext();
  const selected = selectedUser?._id === user._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <>
    <div
     className={`${selected ? `bg-sky-600`:""} flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
     onClick={()=>setSelectedUser(user)}
     >
      <div className={`avatar ${isOnline ? 'online' : ""} `}>
        <div className='w-12 rounded-full'>
          <img src={user.profilePic} alt="user avatar" />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-700'> {user.fullName}</p>
        </div>
      </div>
    </div>
     </>  
  )
}

export default User
