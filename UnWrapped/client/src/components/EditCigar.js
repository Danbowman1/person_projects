import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import CigarForm from './CigarForm'

const EditCigar = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  const [cigar, setCigar] = useState({})

  const editSubmitHandler = (e, data) =>{

    axios.put(`http://localhost:8000/api/cigars/${id}`,
    data)
    .then((res)=>{
      console.log(res.data)
      navigate('/')
    })
    .catch((err)=>{
      console.log(err)
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
      <Header />
      {loaded &&
      <CigarForm
        onSubmitProp={editSubmitHandler}
        initialCigarName={cigar.cigarName}
        initialDescription={cigar.description}
        initialImage={cigar.image}
        initialRating={cigar.rating}
      />
      }
    </div>
  )
}

export default EditCigar