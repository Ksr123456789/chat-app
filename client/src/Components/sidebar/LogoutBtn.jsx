import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../Hooks/useLogout';

const LogoutBtn = () => {

  const {logout, loading} = useLogout();

  return (

    <div className='p-4'>
      <BiLogOut className='w-10 h-10 text-black cursor-pointer' 
      onClick={()=>logout()}
    />
    </div>
  )
}

export default LogoutBtn
