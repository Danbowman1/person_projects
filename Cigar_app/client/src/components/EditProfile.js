import React, {useState, useEffect} from 'react'
import { Box, Button, Input, TextField } from '@mui/material'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditProfile = () => {

const {username} = useParams()


const  [usersname, setUsersname ] = useState('')
const [email, setEmail] = useState('')
const [ password, setPassword ] = useState('')
const navigate = useNavigate()




useEffect(()=> {

    const userGetter = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/users`,
            {
                withCredentials: true
            }
            )
            console.log(res.data)
            setUsersname(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            console.log(res.data._id)
        } catch (error) {
            console.log(error)
        }
    }
    userGetter()
}, [])

const submitHandler = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/users/editprofile/${username}`,
    {withCredentials:true},
    {
        username: usersname, 
        email: email,
        password: password
    })
    .then((res)=> {
        console.log(res.data)
        navigate("/home")
    })
    .catch((err)=>{
        console.log(err)
    })
}


    return (
        <div>
            <NavBar />
            
                <Box sx={{width: 400, height: 400, padding:'30px' ,boxShadow: 1, m: '40px auto'}}>
                    <form style={{width:'80%', height:'300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '0 auto'}} onSubmit={submitHandler}>
                        <TextField
                        variant='outlined'
                        label='Username'
                        value={usersname}
                        size='small'
                        onChange={(e)=>setUsersname(e.target.value)}
                        />
                        <TextField
                        variant='outlined'
                        label='Email'
                        value={email}
                        size='small'
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <TextField
                        type='password'
                        variant='outlined'
                        label='Password'
                        size='small'
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        
                        <Button type='submit' >Submit</Button>
                    </form> 
                </Box>
        </div>
    )
}

export default EditProfile