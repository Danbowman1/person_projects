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

const [fileInputState, setFileInputState] = useState('');
const [previewSource, setPreviewSource] = useState('');
const [selectedFile, setSelectedFile] = useState();
const [successMsg, setSuccessMsg] = useState('');
const [errMsg, setErrMsg] = useState('');
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



const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
    
};

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        uploadImage(reader.result)
        
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        setErrMsg('something went wrong!');
    };
    await axios.put(`http://localhost:8000/api/users/editprofile/${username}`,
    {withCredentials: true},
    {
        username,
        email,
        
    }
    )
    
};

const uploadImage = async (base64EncodedImage) => {
    try {
        
    await fetch('http://localhost:8000/api/upload/user/image', {
            method: 'POST',
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        setFileInputState('');
        setPreviewSource('');
        setSuccessMsg('Image uploaded successfully');
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};

    return (
        <div>
            <NavBar />
            
                <Box sx={{width: 400, height: 400, padding:'30px' ,boxShadow: 1, m: '40px auto'}}>
                    <form style={{width:'80%', height:'300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '0 auto'}} onSubmit={handleSubmitFile}>
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
                        <Box>
                        <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileInputChange}/>
                        <IconButton color="primary" aria-label="upload picture" component="span" >
                        <PhotoCamera />
                        </IconButton>
                        </label>
                        {previewSource && (
                        <img
                            src={previewSource}
                            alt="chosen"
                            style={{ width: '70px', marginLeft:'40px' }}
                        />)}
                        </Box>
                        <Button type='submit' >Submit</Button>
                    </form> 
                </Box>
        </div>
    )
}

export default EditProfile