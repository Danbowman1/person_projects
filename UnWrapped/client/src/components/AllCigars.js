import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'

const AllCigars = (props) => {

    const {cigarList, removeFromDom, searchTerm} = props
    const navigate = useNavigate()

    return (
        <div>
            {
                cigarList.filter((val)=>{
                    if(searchTerm === ''){
                        return val
                    } else if (val.cigarName.toLowerCase().includes(searchTerm.toLowerCase()) || val.brand.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                    }
                })
                .map((cigar, index)=>(
                    <div key={index} className="singleCigar">
                        <h2>{cigar.cigarName}</h2>
                        <p className='cigarBrand'>{cigar.brand}</p>
                        <img src={cigar.image} alt="Cigar" className='cigarImg' />
                        <p>{cigar.description}</p>
                        <p>Rating: {cigar.rating}/5</p>
                        <div className='displayBtnContainer'>
                        <DeleteBtn deleteCallBack={()=>removeFromDom(cigar._id)}/>
                        <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AllCigars