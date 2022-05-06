import React, { useEffect } from 'react'
import axios from 'axios'
import CigarCard from './CigarCard'


const AllCigars = (props) => {

    const { cigarList, setCigarList } = props
    

    useEffect(() => {
        const getCigars = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/cigars`)
                console.log(res)
                console.log(res.data)
                setCigarList(res.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        getCigars()
    }, [])

    

    return (
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', padding:'10px'}}>
            
            { 
                cigarList.map(cigar => (
                    <CigarCard 
                    brand={cigar.brand} 
                    name={cigar.name} 
                    description={cigar.description} 
                    img={cigar.img} 
                    rating={cigar.rating} 
                    key={cigar._id}
                    />
                ))
            }
            
        

        </div>
    )
}

export default AllCigars