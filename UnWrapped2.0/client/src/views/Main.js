import axios from 'axios'
import React, { useState, useRef, useContext } from 'react'
import AllCigars from '../components/AllCigars'
import CigarForm from '../components/CigarForm'
import NavBar from '../components/NavBar'
import MyContext from '../context/MyContext'


const Main = () => {

    const [cigarList, setCigarList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    const context = useContext(MyContext)
    const ref = useRef()
    // const [ brand, setBrand ] = useState('')
    // const [ name, setName ] = useState('')
    // const [ description, setDescription ] = useState('')
    // const [ image, setImage ] = useState('')
    // const [ rating, setRating ] = useState('')

    const createCigar = async (cigarParams) => {
        try {
            const data = new FormData()
            data.append('file', context.image)
            data.append('upload_preset', 'cigar_app')
            const res = await axios.post('https://api.cloudinary.com/v1_1/dmsqthdn3/image/upload', data)
            console.log(res.data)
            context.setImage(res.data.url)
            console.log(context.image)

            const res3 = await axios.post(`http://localhost:8000/api/cigars`,
            {
                brand: cigarParams.brand,
                name: cigarParams.name,
                description: cigarParams.description,
                img: res.data.url,
                rating: cigarParams.rating
            }
            )
                    console.log(cigarParams)
                    console.log(res3.data)
                    setCigarList([ res3.data, ...cigarList ])
                    ref.current.value = null
                    
            } catch (error) {
                console.log(error)
            }
    }

    return (
        
        <div>
            <NavBar setSearchTerm={setSearchTerm}/>
            

            <div style={{width:'75%', margin:'0 auto'}}>
                <CigarForm 
                initialBrand=''
                initialName=''
                initialDescription=''
                initialRating=''
                onSubmitProp={createCigar}
                image={ref}
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