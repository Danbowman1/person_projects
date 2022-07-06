import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const UserRegistration = (props) => {

    const [confirmReg, setConfirmReg] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/users/register',
        user,
        {
            withCredentails: true
        })
        .then((res)=>{
            console.log(res.data)
            setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setConfirmReg(
                "Thank you for Registering, you can now log in!",
            )
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
        <Logo/>
        {confirmReg ? <h4>{confirmReg}</h4> : null}
        <h1>Register</h1>

        <form onSubmit={register}>
            <div className='inputContainer'>
            {errors.username ? (
                <span>{errors.username.message}</span>
            ) : null}
                <label>Username</label>
                <input 
                type="text"
                name='username'
                value={user.username}
                onChange={(e)=> handleChange(e)}
                />
                <label>Email</label>
                {errors.email ? (
                <span>{errors.email.message}</span>
            ) : null}
                <input 
                type="text"
                name='email'
                value={user.email}
                onChange={handleChange}
                />
                <label>Password</label>
                {errors.password ? (
                <span>{errors.password.message}</span>
            ) : null}
                <input 
                type="password" 
                name="password" 
                value={user.password}
                onChange={handleChange}
                />
                <label>Confirm Password</label>
                {errors.confirmPassword ? (
                <span>{errors.confirmPassword.message}</span>
            ) : null}
                <input 
                type="password" 
                name="confirmPassword" 
                value={user.confirmPassword}
                onChange={handleChange} 
                />
            </div>
            <button>Register</button>
        </form>
        </div>
    )
}

export default UserRegistration