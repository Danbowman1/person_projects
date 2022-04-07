import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Form from '../components/Form'

const EditCigar = () => {

  const {id} = useParams()

  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [errors, setErrors] = useState({})
  const [cigar, setCigar] = useState({})

  const editSubmitHandler = (updatedCigar) =>{

    axios.put(`http://localhost:8000/api/cigars/${id}`,
    updatedCigar)
    .then((res)=>{
      console.log(res.data)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err)
      setErrors(err.response.data.errors)
    })
  }

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/cigars/${id}`)
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            setCigar(res.data)
            setLoaded(true)
            
        })
        .catch((err)=>{
            console.log(err)
        })
},[id])

  
  return (
    <div>
      <NavBar />
      {loaded &&
        <div className='mainContainer'>
        <Form
        onSubmitProp={editSubmitHandler}
        initialCigarName={cigar.cigarName}
        initialBrand={cigar.brand}
        initialDescription={cigar.description}
        initialImage={cigar.image}
        initialRating={cigar.rating}
        errors={errors}
      />

        </div>
      }
    </div>
  )
}

export default EditCigar