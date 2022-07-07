
import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AllCigars = (props) => {

    

    const {cigarList, removeFromDom, searchTerm, user} = props
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
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
                        <img src={cigar.image} alt="Cigar" className='cigarImg' />
                    <div className="textArea">
                        <Link to={`/cigar/${cigar._id}`} className="oneCigarLink">
                            <h2 className='brand'>{cigar.brand}</h2>
                            <p className='cigarName'>{cigar.cigarName}</p>
                        </Link>
                        <hr />
                        
                            <div className="cigarReview">
                                <p className='description'>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                        <div className="singleCigarBottom">
                            {cigar.createdBy?.username === user.username &&
                            <div className='displayBtnContainer'>
                            <button onClick={()=>removeFromDom(cigar._id)}>Delete Post</button>
                            <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                            </div> 
                            }
                        </div>
                        <hr />
                            <p className='profileLink'>Posted By:<Link to={`/user/profile/${cigar.createdBy?.username}`}>{cigar.createdBy?.username}</Link></p>
                    </div>
                        
                        
                </div>
                ))
            }
        </div>
    )
}

export default AllCigars