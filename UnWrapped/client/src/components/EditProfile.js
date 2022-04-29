import React, {useState, useEffect} from 'react'
import { Box, TextField } from '@mui/material'
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditProfile = () => {

const {username} = useParams()
const [user, setUser] = useState()
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
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    userGetter()
}, [])

const editUser = () =>{
    axios.put(`http://localhost:8000/api/users/editprofile/${username}`)
        .then((res)=>{
            navigate('/')
        })    
        .catch((error)=>{
            console.log(error)
        }) 
    }


    return (
        <div>
            <NavBar />
            <form style={{display: 'flex', flexDirection:'column', width:'500px'}}>
                <TextField
                variant='filled'
                />
                <TextField
                variant='filled'
                />
                <TextField
                variant='filled'
                />
            </form>
        </div>
    )
}

export default EditProfile