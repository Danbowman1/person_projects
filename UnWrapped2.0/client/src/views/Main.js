import React, { useState } from 'react'
import AllCigars from '../components/AllCigars'
import CigarForm from '../components/CigarForm'
import NavBar from '../components/NavBar'

const Main = () => {

    const [cigarList, setCigarList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    

    return (
        
        <div >
            <NavBar setSearchTerm={setSearchTerm}/>
            <div style={{width:'75%', margin:'0 auto'}}>
                <CigarForm 
                cigarList={cigarList} 
                setCigarList={setCigarList} />

                <hr style={{margin:'0'}}/>

                <AllCigars 
                cigarList={cigarList} 
                setCigarList={setCigarList}
                searchTerm={searchTerm}
                />
            </div>
            

        </div>
    )
}

export default Main