import React from 'react'
import SideBar from "../../Components/sidebar/SideBar"
import MessageContainer from '../../Components/messageContainer/MessageContainer'

const Home = () => {
  return (
    <div className='flex justify-center items-center   rounded-md gap-5'>
      <SideBar/> 
      <MessageContainer/>
    </div>
  )
}

export default Home
