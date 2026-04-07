import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './firebase.js'

const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("logged in");
        navigate('/')
      }
      else{
        console.log("logged out")
        navigate('/login');
      }
    })
  },[])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App
