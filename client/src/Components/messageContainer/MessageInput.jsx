import React, { useState } from 'react'
import useSendMessage from '../../Hooks/useSendMessage';

const MessageInput = () => {

  const [message, setMessage] = useState("");

  const {sendMessage, loading} = useSendMessage();

  const submithandler = (e) =>{
    
    e.preventDefault()
    if(!message) return;
    sendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={submithandler} className='flex gap-1'>
      <input value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder="Type here" className=" w-10 input input-bordered input-error w-full max-w-xs" />
      <button disabled={loading} type='submit' className="btn btn-outline btn-ghost">send</button>
    </form>
  )
}

export default MessageInput
