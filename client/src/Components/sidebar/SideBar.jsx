import React from 'react'
import InputSearch from "./InputSearch"
import AllUsers from "./AllUsers"
import LogoutBtn from "./LogoutBtn"

const SideBar = () => {
  return (
    <div className='bg-slate-400 rounded'>
      <InputSearch/>
      <AllUsers/>
      <LogoutBtn/>
    </div>
  )
}

export default SideBar
