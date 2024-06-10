import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'


 const socketContext = createContext();

export const useSocketContext = () =>{
  return useContext(socketContext);
}

export const SocketContextProvider = ({children})=>{

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authenticatedUser} = useAuthContext();


  useEffect(()=>{

    if(authenticatedUser){
      const socket = io(`http://localhost:8080`, {
        query:{
          userId:authenticatedUser._id
        }
      });
    

      setSocket(socket);

      socket.on(`getOnlineUsers`, (users)=>{
        setOnlineUsers(users);
      })

     return ()=> socket.close();
    } else{
      if(socket){
        socket.close();
        setSocket(null);
      }
    }

  },[authenticatedUser])



  return(
    <socketContext.Provider value={{socket, onlineUsers}}>
    {children}
  </socketContext.Provider>
  )
  
}