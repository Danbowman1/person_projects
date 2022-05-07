import React from 'react'
import styles from '../styles/NavBar.module.css'

const NavBar = (props) => {

    const {setSearchTerm} = props

    return (
        <div className={styles.container}>
            <h1>UnWrapped</h1>
            <input onChange={(e) => {setSearchTerm(e.target.value)}} type="search" name="search" id="search" />
            <button className={styles.menu}>Menu</button>
        </div>
    )
}

export default NavBar