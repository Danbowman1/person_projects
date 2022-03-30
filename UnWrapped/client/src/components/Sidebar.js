import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>Merch</Link>
            <Link to={'/'}>Events</Link>
        </div>
    )
}

export default Sidebar