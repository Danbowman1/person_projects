import React, { useState } from 'react'
import AllCigars from '../components/AllCigars'
import CigarForm from '../components/CigarForm'
import NavBar from '../components/NavBar'

const Main = () => {

    const [cigarList, setCigarList] = useState([])

    

    return (
        <div style={{width:'75%', margin:'0 auto'}}>

            <NavBar />

            <CigarForm 
            cigarList={cigarList} 
            setCigarList={setCigarList} />

            <hr style={{margin:'0'}}/>

            <AllCigars 
            cigarList={cigarList} 
            setCigarList={setCigarList}
            />

        </div>
    )
}

export default Main