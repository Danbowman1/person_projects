import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../components/NavBar'

const OneCigar = () => {

    const {id} = useParams()
    const [cigar, setCigar] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cigars/${id}`)
            .then((res)=>{
                console.log(res)
                console.log(res.data)
                setCigar(res.data)
            })
            .catch((err)=>console.log(err))
    }, [])

    return (
        <div>
        <Header />
        <div className="mainContainer">
            <div className="singleCigar">
                <h2 className='cigarHeader'>{cigar.cigarName}</h2>
                <p>{cigar.brand}</p>
                <img src={cigar.image} alt="Cigar" className='cigarImg' />
                <div className="cigarReview">
                <p>{cigar.description}</p>
                <p>Rating: {cigar.rating}/5</p>
            </div>
        </div>
        <hr />
        <div className="commentsHeader">
            <h3>Comments</h3>
            <h4>0</h4>
        </div>
        <form className='commentContainer'>
            <textarea name="comments" className='commentTextarea'></textarea>
            <button>Comment</button>
        </form>
        
        </div>
        
            
        </div>
    )
}

export default OneCigar