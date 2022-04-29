import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'

const AllCigars = (props) => {

    

    const {cigarList, removeFromDom, searchTerm, user} = props
    const navigate = useNavigate()


    

    return (
        <div className='displayContainer'>
            {
                cigarList.filter((val)=>{
                    if(searchTerm === ''){
                        return val
                    } else if (val.cigarName.toLowerCase().includes(searchTerm.toLowerCase()) || val.brand.toLowerCase().includes(searchTerm.toLowerCase()) || val.createdBy.username.toLowerCase().includes(searchTerm.toLowerCase())
                    ){
                        return val
                    }
                })
                .map((cigar, index)=>(
                    <div key={index} className="singleCigar">
                        
                        <div className='cigarHeader'>
                        <Link to={`/cigar/${cigar._id}`} className="oneCigarLink">
                            <h2>{cigar.brand}</h2>
                            <p>{cigar.cigarName}</p>
                        </Link>
                        </div>
                            <img src={cigar.image} alt="Cigar" className='cigarImg' />
                            <div className="cigarReview">
                                <p className='description'>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                            <div className="singleCigarBottom">
                                {cigar.createdBy?.username === user.username &&
                                <div className='displayBtnContainer'>
                                <DeleteBtn deleteCallBack={()=>removeFromDom(cigar._id)}/>
                                <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                                </div> 
                                }
                                <p className='profileLink'>Posted By:<Link to={`/user/profile/${cigar.createdBy?.username}`}>{cigar.createdBy?.username}</Link></p>
                            </div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default AllCigars