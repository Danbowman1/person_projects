import React, { useContext, useEffect, useState, useRef } from 'react'
import MyContext from '../context/MyContext'
import { Dialog, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, } from '@mui/material'
import styles from '../styles/CigarCard.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CigarForm from './CigarForm'
import axios from 'axios'


const CigarCard = (props) => {

    const { deleteFilter, id } = props

    
    const context = useContext(MyContext)
    const [cigar, setCigar] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const getCigars = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/cigars/${id}`)
                setCigar(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCigars()
    }, [])


    const editCigar = async (updatedCigar) => {
        try {
            const data = new FormData()
            data.append('file', context.image)
            data.append('upload_preset', 'cigar_app')
            const res = await axios.put('https://api.cloudinary.com/v1_1/dmsqthdn3/image/upload', data)
            console.log(res.data)
            context.setImage(res.data.url)

            const res2 = await axios.put(`http://localhost:8000/api/cigars/${id}`, 
            {
                brand: updatedCigar.brand,
                name: updatedCigar.name,
                description: updatedCigar.description,
                img: res.data.url,
                rating: updatedCigar.rating
            })
            console.log(res2.data)
            setOpenDialog(false)
            
        } catch (err) {
            console.log(err)
        }
    }
    


    const handleClickOpen = () => {
    setOpenDialog(true);
    };

    const handleCloseDialog = () => {
    setOpenDialog(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    


    return (
        
                <div className={styles.container}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderText}>
                            <p>{cigar.brand}</p>
                            <p>{cigar.name}</p>
                        </div>
                        <div className={styles.cardMenu}>
                            <IconButton
                            aria-label='Options'
                            id='long-button'
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup='true'
                            onClick={handleClick}
                            >
                            <MoreVertIcon/>
                            </IconButton>
                            <Menu
                            id='long-menu'
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            >
                            <MenuItem onClick={handleClickOpen}>
                                <ListItemIcon>
                                    <EditIcon fontSize='small'/>
                                </ListItemIcon>
                                Edit Cigar
                            </MenuItem>
                            <MenuItem onClick={deleteFilter}>
                                <ListItemIcon >
                                    <DeleteIcon fontSize='small'/>
                                </ListItemIcon>
                                Delete Cigar
                            </MenuItem>
                            </Menu>

                            <Dialog 
                            PaperProps={{
                                style: {
                                    backgroundColor:'var(--bg)',
                                    borderRadius:'var(--border-radius)',
                                    padding:'10px 0'
                                    }
                            }}
                            
                            open={openDialog} 
                            onClose={handleCloseDialog} 
                            sx={{}}>
                            <DialogTitle style={{width:'200px', margin:'0 auto', textAlign:'center'}}>Edit Cigar</DialogTitle>
                            <CigarForm
                            initialBrand={cigar.brand}
                            initialName={cigar.name}
                            initialDescription={cigar.description}
                            initialRating={cigar.rating}
                            onSubmitProp={editCigar}
                            />

                            </Dialog>
                        </div>
                    </div>
                    
                    <img src={cigar.img} alt="cigar" className={styles.cardImg} />
                    <p className={styles.description}>{cigar.description}</p>
                    <p className={styles.rating}>Rating: {cigar.rating}/5</p>
                    
                </div>
        
    )
}



export default CigarCard