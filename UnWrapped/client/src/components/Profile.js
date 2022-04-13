import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Profile = (props) => {

    const {username} = useParams()
    const [userCigarList, setUserCigarList] = useState([])

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

    


    return (
        <div>
        <NavBar />
        <div className='profileContainer'>
            {
                userCigarList.map((cigar, index)=>(
                    
                    <div key={index} className="singleCigar">
                        <div className='cigarHeader'>
                        
                            <h2>{cigar.cigarName}</h2>
                            <p>{cigar.brand}</p>
                        </div>
                            <img src={cigar.image} alt="Cigar" className='cigarImg' />
                            <div className="cigarReview">
                                <p>{cigar.description}</p>
                                <p>Rating: {cigar.rating}/5</p>
                            </div>
                    </div>
                        
                    
                ))
            }
        </div>

        </div>
        
    )
}

export default Profile