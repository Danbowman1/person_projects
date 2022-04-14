import axios from 'axios'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const UserLogin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()


  const login = (e) =>{
    e.preventDefault()
      axios.post("http://localhost:8000/api/users/login",
      {
        email, 
        password
      },
      {
        withCredentials: true,
        credentials: "include"
      },
    )
    .then((res)=>{
      console.log(res)
      console.log(res.data)
      navigate('/home')
    })
    .catch((err)=>{
      console.log(err)
      setErrorMessage(err.response.data.message)
    })
  }


  return (
    <div style={{textAlign: "center"}}>
    <Logo/>
      <h1>Login</h1>
      <p>{errorMessage ? errorMessage : ''}</p>
      <form onSubmit={login}>
        <div className='inputContainer'>
          <label>Email</label>
          <input 
          type="text"
          name='email'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
          <label>Password</label>
          <input 
          type="text"
          name='password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <button style={{marginBottom: "16px"}}>Sign In</button>
      </form>
        <Link to={"/registration"}>Create a Free Account</Link>
    </div>
  )
}

export default UserLogin