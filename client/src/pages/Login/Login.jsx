import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import useLogin from '../../Hooks/useLogin';
const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {login, loading} = useLogin();

  const handleSubmit = async (e)=>{
    e.preventDefault();
     login(userName, password);
     setUserName("");
     setPassword("");
  }

  return (
   <>
   <div className='flex items-center justify-center m-20 text-5xl font-bold'>Login</div>
   <div className='flex items-center justify-center'>
    
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" className="grow" placeholder="enter username" />
        </label>
      </div>

       <div>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="grow" placeholder="enter password" />
          </label>
       </div>

  <Link to={"/register"} className='hover:text-blue-500 hover:underline'>{`Don't have an account`}</Link>
  <div className='ml-20'>
  <button disabled={loading} type='submit' className="btn btn-neutral px-10 text-2xl" >Login</button>
  </div>
    </form>
   </div>
   </>
  )
}

export default Login
