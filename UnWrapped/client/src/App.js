import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import EditCigar from './views/EditCigar';
import UserLogin from './views/UserLogin';
import OneCigar from './views/OneCigar';
import io from 'socket.io-client'

function App() {

  const [socket, setSocket] = useState(()=> io(":8000"))

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("socket in the client", socket.id)
    })
    return ()=> socket.disconnect(true)
  }, [])


  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/cigar/edit/:id' element={<EditCigar/>} />
        <Route path='/cigar/login' element={<UserLogin />} />
        <Route path='/cigar/:id' element={<OneCigar socket={socket} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
