import React, { useEffect }  from 'react'
import { Routes, Route, Navigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useAuthContext } from './Context/AuthContext'

const App = () => {

  const {setAuthenticatedUser, authenticatedUser} = useAuthContext();

  return (
    <>
    <Routes>
        <Route  path='/' element={authenticatedUser? <Home/> : <Navigate to={`/login`}/>}/>
        <Route path='/login' element={ authenticatedUser? <Navigate to={`/`}/> : <Login/>} />
        <Route path='/register' element={authenticatedUser? <Navigate to={`/`}/> : <Register/>} />
      </Routes>
      <Toaster/>
    </>
      
  )
}

export default App
