import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllCigars from '../components/AllCigars'
import CigarForm from '../components/CigarForm'
import Header from '../components/Header'

const Main = () => {

    const [cigarList, setCigarList] = useState([])

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
                
                setCigarList([...cigarList, res.data])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    return (
        <div>
            <Header />
            <CigarForm 
                onSubmitProp={createCigar}
                initialCigarName=''
                initialDescription=''
                initalImage=''
            />
            <hr/>
            <AllCigars 
                cigarList={cigarList}
                removeFromDom={removeFromDom}
            />

        </div>
    )
}

export default Main