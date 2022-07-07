import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Profile = (props) => {

    const {username} = useParams()
    const [user, setUser] = useState({})
    const [userCigarList, setUserCigarList] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const userCigarGetter = async () =>{
            try {
                const res = await axios.get(`http://localhost:8000/api/cigarsbyuser/${username}`,
                { withCredentials: true,
                    credentials: "include" }
                )
                console.log(res.data)
                setUserCigarList(res.data)
            }catch(err){
                console.log(err)
            }
        }
        userCigarGetter()
    }, [])

    const deleteCigar = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/cigars/${idFromBelow}`,
        {withCredentials: true}
        )
            .then((res)=>{
                console.log(res.data)
                const newList = userCigarList.filter(cigars => cigars._id !== idFromBelow)
                setUserCigarList(newList)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    useEffect(()=>{
        const userGetter = async () =>{
            try{
            const res = await axios.get('http://localhost:8000/api/users',
            { withCredentials: true,
                credentials: "include" })
                console.log(res.data)
                setUser(res.data)
                console.log(user)
            }catch(err){
                console.log(err)
            }
        }
        userGetter() 
    }, [])



    return (
        <div>
        <NavBar />
        <div className='profileContainer'>
            {
                userCigarList.map((cigar, index)=>(
                    <div key={index} className="singleCigar">
                        <img src={cigar.image} alt="Cigar" className='cigarImg' />
                    <div className="textArea">
                        
                            <h2 className='brand'>{cigar.brand}</h2>
                            <p className='cigarName'>{cigar.cigarName}</p>
                        
                        <hr />
                        
                            <div className="cigarReview">
                                <p className='description'>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                            <hr />
                        <div className="singleCigarBottom">
                            {cigar.createdBy?.username === user.username &&
                            <div className='displayBtnContainer'>
                            <button onClick={()=>deleteCigar(cigar._id)}>Delete Post</button>
                            <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit Post</button>
                            </div> 
                            }
                        </div>
                            
                    </div>
                        
                        
                </div>
                    
                    /* <div key={index} className="singleCigar">
                            <img src={cigar.image} alt="Cigar" className='cigarImg' />
                        <div className='cigarHeader'>
                        
                            <h2>{cigar.cigarName}</h2>
                            <p>{cigar.brand}</p>
                        </div>
                            <div className="cigarReview">
                                <p>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                            {cigar.createdBy?.username === user.username &&
                            <div>
                            <button onClick={()=>{deleteCigar(cigar._id)}}>Delete</button>
                            <button onClick={()=>navigate(`/cigar/edit/${cigar._id}`)}>Edit</button>
                            </div>
                            }
                            
                    </div> */
                        
                    
                ))
            }
        </div>

        </div>
        
    )
}

export default Profile