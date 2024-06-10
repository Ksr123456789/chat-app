import React, { useState } from 'react'
import useGetUsers from '../../Hooks/useGetUsers';
import { useAuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const InputSearch = () => {

  const [name, setName] = useState("");
  const {setSelectedUser} = useAuthContext();
  const {users} = useGetUsers();

  const handleClick = () =>{

    
    const user = users.find((i)=> i.fullName.toLowerCase() === name.toLowerCase());
    if(user){
      setSelectedUser(user);
      setName("");
    }
    else{
      toast.error(`user not found`);
    }
  }

  

  return (
    <div className='flex gap-2'>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      <button onClick={handleClick} className="btn">search</button>

    </div>
  )
}

export default InputSearch
