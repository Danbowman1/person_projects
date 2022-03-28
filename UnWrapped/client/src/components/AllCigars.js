import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'

const AllCigars = (props) => {

    const {cigarList, removeFromDom} = props
    const navigate = useNavigate()

    return (
        <div className='cigarListContainer'>
            {
                cigarList.map((cigar, index)=>(
                    <div key={index} className="singleCigar">
                        <h2>{cigar.cigarName}</h2>
                        <img src={cigar.image} alt="Cigar" className='cigarImg' />
                        <p>{cigar.description}</p>
                        <p>Rating:{cigar.rating}/5</p>
                        <div className='displayBtnConntainer'>
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