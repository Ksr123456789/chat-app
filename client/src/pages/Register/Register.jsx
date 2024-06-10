import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import useRegister from '../../Hooks/useRegister';
import GenderCheckBox from './GenderCheckBox';
const Register = () => {

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  
  const {register, loading} = useRegister();

  const setselectedGender = (gender) =>{
    setGender(gender);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    register(fullName, userName, password, confirmPassword, gender);
    setFullName("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setGender("");
  }

  return (
   <>
   <div className='flex items-center justify-center m-20 text-5xl font-bold'>Register</div>
   <div className='flex items-center justify-center'>
    
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          Full Name
          <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text" className="grow" placeholder="enter fullName" />
        </label>
      </div>

      <div>
        <label className="input input-bordered flex items-center gap-2">
          username
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" className="grow" placeholder="enter username" />
        </label>
      </div>

      <div>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className="grow" placeholder="enter password" />
        </label>
      </div>

      <div>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="text" className="grow" placeholder="confirm Password" />
        </label>
      </div>

      <GenderCheckBox  setselectedGender={setselectedGender} gender={gender} />


  <Link to={`/login`} className='hover:text-blue-500 hover:underline'>{` have an account!`}</Link>
  <div className='ml-20'>
  <button disabled={loading} type='submit' className="btn btn-neutral px-5 text-2xl" >sign up</button>
  </div>
    </form>
   </div>
   </>
  )
}

export default Register
