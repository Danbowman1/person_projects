import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllCigars from '../components/AllCigars'
import Form from '../components/Form'
import NavBar from '../components/NavBar'


const Main = () => {

    const [cigarList, setCigarList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState({})
    
    
    

    useEffect(()=>{
        const cigarGetting = async () =>{
        try {
            const res = await axios.get("http://localhost:8000/api/cigars")
            console.log(res.data)
            setCigarList(res.data)
            
            }catch(err){
            console.log(err)
            }
        } 
        cigarGetting()
    }, [])

    // useEffect(()=>{
    //     const userGetter = async () =>{
    //         try{
    //         const res = await axios.get('http://localhost:8000/api/users',
    //         { withCredentials: true,
    //             credentials: "include" })
    //             console.log(res.data)
    //             setUser(res.data)
    //             console.log(user)
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    //     userGetter() 
    // }, [])

    const removeFromDom = (cigarId) => {
        axios.delete(`http://localhost:8000/api/cigars/${cigarId}`,
        { withCredentials: true }
        )
            .then((res)=>{
                console.log(res.data)
                setCigarList(cigarList.filter((cigar, index)=>cigar._id !== cigarId))
            })
            .catch((err)=>console.log(err))
    }

    const createCigar = async (cigarParam) => {
        try {
            const res = await axios
            .post("http://localhost:8000/api/cigars", cigarParam,
                { withCredentials: true }
            )
            console.log(res);
                console.log(res.data)
                setCigarList([res.data, ...cigarList])
            }catch(err){
            console.log(err)
            console.log(err.response.data)
            console.log(err.response.data.errors)
            setErrors(err.response.data.errors)
        }
        
    }
    
    

    return (
        <div>
            <NavBar 
            setSearchTerm={setSearchTerm}
            
            />

            <div className='mainContainer'>
            
            <Form 
                onSubmitProp={createCigar}
                initialCigarName=''
                initialBrand=''
                initialDescription=''
                initialImage=''
                initialRating=''
                errors={errors}
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