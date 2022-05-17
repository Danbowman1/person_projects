import React, { useState } from 'react'
import styles from '../styles/NavBar.module.css'


const NavBar = (props) => {

    const {setSearchTerm} = props

    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>UnWrapped</h1>
            <input onChange={(e) => {setSearchTerm(e.target.value)}} type="search" name="search" id="search" />
            <div className={styles.darkMode}>
        
            </div>
        </div>
    )
}


export default NavBar