import React, { useState } from 'react'
import { Dialog, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, } from '@mui/material'
import styles from '../styles/CigarCard.module.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CigarForm from './CigarForm'





const CigarCard = (props) => {

    const { brand, name, description, img, rating, deleteFilter } = props

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


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
                            <p>{brand}</p>
                            <p>{name}</p>
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
                                    backgroundColor:'var(--bg)'
                                    }
                            }}
                            
                            open={openDialog} 
                            onClose={handleCloseDialog} 
                            sx={{}}>
                            <DialogTitle style={{width:'200px', margin:'0 auto', textAlign:'center'}}>Edit Cigar</DialogTitle>
                            <CigarForm />

                            </Dialog>
                            

                        </div>
                    </div>
                    
                    <img src={img} alt="cigar" className={styles.cardImg} />
                    <p className={styles.description}>{description}</p>
                    <p className={styles.rating}>Rating: {rating}/5</p>
                    
                </div>
        
    )
}



export default CigarCard