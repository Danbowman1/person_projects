import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllCigars from '../components/AllCigars'
import Form from '../components/Form'
import NavBar from '../components/NavBar'


const Main = () => {

    const [cigarList, setCigarList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    

    useEffect(()=>{
        axios.get("http://localhost:8000/api/cigars")
            .then(res=>{
                console.log(res.data)
                setCigarList(res.data)
                
            })
            .catch(err=>{
                console.log(err)
            })
    }, [])

    const removeFromDom = (cigarId) => {
        axios.delete(`http://localhost:8000/api/cigars/${cigarId}`)
            .then((res)=>{
                console.log(res.data)
                setCigarList(cigarList.filter((cigar, index)=>cigar._id !== cigarId))
            })
            .catch((err)=>console.log(err))
    }

    const createCigar = (cigarParam) => {
        axios
            .post("http://localhost:8000/api/cigars", cigarParam)
            .then((res) => {
                console.log(res);
                console.log(res.data)
                
                setCigarList([res.data, ...cigarList])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    return (
        <div>
            <NavBar setSearchTerm={setSearchTerm}/>

            <div className='mainContainer'>
            
            
            <Form 
                onSubmitProp={createCigar}
                initialCigarName=''
                initialBrand=''
                initialDescription=''
                initialImage=''
                initialRating=''
            />
            <hr/>
            <AllCigars 
                cigarList={cigarList}
                removeFromDom={removeFromDom}
                searchTerm={searchTerm}
                
            />
            
            </div>

        </div>
    )
}

export default Main