import './App.css';
import { useState, useEffect, } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import EditCigar from './views/EditCigar';
import UserLogin from './views/UserLogin';
import OneCigar from './views/OneCigar';
import UserRegistration from './views/UserRegistration';
import Profile from './components/Profile';
import io from 'socket.io-client'
import EditProfile from './components/EditProfile';

function App() {

  const [socket, setSocket] = useState(()=> io(":8000"))

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("socket in the client: ", socket.id)
    })

    return () => socket.disconnect(true);

  }, [])


  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/registration' element={<UserRegistration />} />
        <Route path='/home' element={<Main/>} />
        <Route path='/cigar/edit/:id' element={<EditCigar/>} />
        <Route path='/cigar/:id' element={<OneCigar socket={socket}/>} />
        <Route path='/user/profile/:username' element={<Profile/>} />
        <Route path='/user/edit/profile/:id' element={<EditProfile/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
