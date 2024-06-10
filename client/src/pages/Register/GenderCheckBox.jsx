import React from 'react'

const SetGender = ({setselectedGender, gender}) => {
  return (
    <>
    <div className='flex'>
       <div className="form-control">
          <label className="label gap-4 cursor-pointer">
            <span className="label-text">male</span> 
            <input onChange={()=>setselectedGender("male")} type="checkbox" checked={gender==="male"} className="checkbox" />
          </label>
       </div>

       <div className="form-control">
          <label className="label gap-4 cursor-pointer">
            <span className="label-text">female</span> 
            <input onChange={()=>setselectedGender("female")} type="checkbox" checked={gender==="female"}  className="checkbox" />
          </label>
       </div>
    </div>
      
    </>
  )
}

export default SetGender
