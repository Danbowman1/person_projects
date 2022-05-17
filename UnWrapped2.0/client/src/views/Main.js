import axios from 'axios'
import React, { useState, useRef } from 'react'
import AllCigars from '../components/AllCigars'
import CigarForm from '../components/CigarForm'
import NavBar from '../components/NavBar'


const Main = () => {

    const [cigarList, setCigarList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const ref = useRef()
    const [ brand, setBrand ] = useState('')
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ image, setImage ] = useState('')
    const [ rating, setRating ] = useState('')

    const createCigar = async () => {
        
            try {
                const data = new FormData()
                data.append('file', image)
                data.append('upload_preset', 'cigar_app')
                const res = await axios.post('https://api.cloudinary.com/v1_1/dmsqthdn3/image/upload', data)
                console.log(res.data)
                setImage(res.data.url)

                const res2 = await axios.post(`http://localhost:8000/api/cigars`,{
                            brand,
                            name,
                            description,
                            img: res.data.url,
                            rating
                        })
                        console.log(res2.data)
                        setCigarList([ res2.data, ...cigarList ])
                        setBrand('')
                        setName('')
                        setDescription('')
                        ref.current.value = null
                        setRating('')
            } catch (error) {
                console.log(error)
            }
        
    }

    return (
        
        <div >
            <NavBar setSearchTerm={setSearchTerm}/>
            <div style={{width:'75%', margin:'0 auto'}}>
                <CigarForm 
                cigarList={cigarList} 
                setCigarList={setCigarList} 
                name={name}
                setName={setName}
                brand={brand}
                setBrand={setBrand}
                description={description}
                setDescription={setDescription}
                image={ref}
                setImage={setImage}
                rating={rating}
                setRating={setRating}
                onSubmitProp={createCigar}
                />

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