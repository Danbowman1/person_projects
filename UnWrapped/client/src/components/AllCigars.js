import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'

const AllCigars = (props) => {

    const {cigarList, removeFromDom} = props
    const navigate = useNavigate()

    return (
        <div>
            {
                cigarList.map((cigar, index)=>(
                    <div key={index}>
                        <h2>{cigar.cigarName}</h2>
                        <p>{cigar.description}</p>
                        <img src={cigar.image} alt="Cigar" />
                        <DeleteBtn deleteCallBack={()=>removeFromDom(cigar._id)}/>
                        <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                    </div>
                ))
            }
        </div>
    )
}

export default AllCigars