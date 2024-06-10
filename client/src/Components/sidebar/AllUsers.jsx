import React from 'react'
import useGetUsers from '../../Hooks/useGetUsers'
import User from "./User"

const AllUsers = () => {

  const {users, loading} = useGetUsers();
  // console.log(`users`, users)

  return (
    <div id='allUsers'>
     {users.map((user)=>(
      <User 
       key={user._id}
       user={user}
      />
     ))}
      

    </div>
  )
}

export default AllUsers