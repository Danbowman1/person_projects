import React, {useState, useEffect} from 'react'
import { Box, Button, Input, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import NavBar from '../components/NavBar'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditProfile = () => {

const {username} = useParams()

const  [usersname, setUsersname ] = useState('')
const [email, setEmail] = useState('')
const [ image, setImage ] = useState('')
const navigate = useNavigate()

const Input = styled('input')({
    display: 'none',
});

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
        } catch (error) {
            console.log(error)
        }
    }
    userGetter()
}, [])

// const editUser = () =>{
//     axios.put(`http://localhost:8000/api/users/editprofile/${username}`)
//         .then((res)=>{
//             navigate('/')
//         })    
//         .catch((error)=>{
//             console.log(error)
//         }) 
//     }

    const postDetails = ()=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', "cigar-user")
    }

    return (
        <div>
            <NavBar />
                <Box sx={{width: 400, height: 400, boxShadow: 1, m: ' auto'}}>
                    <form style={{width:'80%', height:'300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '0 auto'}}>
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
                        <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                        </label>
                        <Button>Submit</Button>
                    </form> 
                </Box>
        </div>
    )
}

export default EditProfile