import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, } from '@mui/material'
import styles from '../styles/CigarCard.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CigarForm from './CigarForm'
import axios from 'axios'





const CigarCard = (props) => {

    const { deleteFilter, id } = props

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
                            name={cigar.name}
                            brand={cigar.brand}
                            description={cigar.description}
                            rating={cigar.rating}
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