import { IconButton, Menu, MenuItem, Tooltip, Divider, ListItemIcon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AllCigars = (props) => {

    

    const {cigarList, removeFromDom, searchTerm, user} = props
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const avatarHandler = (e) => {
        setAnchorEl(e.currentTarget)
        // console.log(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    

    return (
        <div className='displayContainer'>
            {
                cigarList.filter((val)=>{
                    if(searchTerm === ''){
                        return val
                    } else if (val.cigarName.toLowerCase().includes(searchTerm.toLowerCase()) || val.brand.toLowerCase().includes(searchTerm.toLowerCase()) || val.createdBy.username.toLowerCase().includes(searchTerm.toLowerCase())
                    ){
                        return val
                    }
                })
                .map((cigar, index)=>(
                    <div key={index} className="singleCigar">
                        
                        <div className='cigarHeader' style={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                        <Link to={`/cigar/${cigar._id}`} className="oneCigarLink">
                            <h2>{cigar.brand}</h2>
                            <p>{cigar.cigarName}</p>
                        </Link>
                        </div>

                        

                            {cigar.createdBy?.username === user.username &&
                        <div>
                        <Tooltip title='Edit/Delete Post'>
                            <IconButton
                            onClick={avatarHandler}
                            sx={{width:26, height:36 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            >
                            <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))',
                            mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
                        <MenuItem onClick={()=>removeFromDom(cigar._id)}>
                            <ListItemIcon>
                                <DeleteIcon/>
                            </ListItemIcon>
                            Delete Post
                        </MenuItem>
                        <MenuItem onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>
                            <ListItemIcon>
                                <EditIcon/>
                            </ListItemIcon>
                            Edit Post
                        </MenuItem>
                        </Menu>
                        </div>
                    }
                        

                        </div>
                            <img src={cigar.image} alt="Cigar" className='cigarImg' />
                            <div className="cigarReview">
                                <p className='description'>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                            <div className="singleCigarBottom">
                                {/* {cigar.createdBy?.username === user.username &&
                                <div className='displayBtnContainer'>
                                <button onClick={()=>removeFromDom(cigar._id)}>Delete Post</button>
                                <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                                </div> 
                                } */}
                                <p className='profileLink'>Posted By:<Link to={`/user/profile/${cigar.createdBy?.username}`}>{cigar.createdBy?.username}</Link></p>
                            </div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default AllCigars