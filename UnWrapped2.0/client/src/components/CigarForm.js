import React, { useState } from 'react'
import styles from '../styles/CigarForm.module.css'
import inputStyle from '../styles/InputStyles.module.css'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import axios from 'axios'

const CigarForm = (props) => {

    const { cigarList, setCigarList } = props

    const [ brand, setBrand ] = useState('')
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ image, setImage ] = useState('')
    const [ rating, setRating ] = useState('')
    


    const submitHandler = async (e) => {
        e.preventDefault()
            try {
                const data = new FormData()
                data.append('file', image)
                data.append('upload_preset', 'cigar_app')
                const res = await axios.post('https://api.cloudinary.com/v1_1/dmsqthdn3/image/upload', data)
                console.log(res.data)
                setImage(res.data.url)

                const res2 = await axios.post(`http://localhost:8000/api/cigars`,{
                            brand,
                            name,
                            description,
                            img: res.data.url,
                            rating
                        })
                        console.log(res2.data)
                        setCigarList([...cigarList, res2.data])
                        setBrand('')
                        setName('')
                        setDescription('')
                        setImage('')
                        setRating('')
            } catch (error) {
                console.log(error)
            }
        
    }



    return (
        <div>
            <form onSubmit={submitHandler} className={styles.formStyle}>
                <div className={styles.cigarLabel}>
                    <div className={styles.inputBox}>
                        <label>Brand</label>
                        <input className={inputStyle.input}
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            name='brand'
                            type='text'
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Name</label>
                        <input className={inputStyle.input}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name='name'
                            type='text'
                        />
                    </div>
                    
                </div>
                <div className={styles.inputBox}>
                <label>Description</label>
                <textarea className={inputStyle.textArea}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name='description'
                />
                </div>
                
                <div className={styles.inputBox}>
                <label>Image</label>
                <input className={inputStyle.file}
                    onChange={(e)=>setImage(e.target.files[0])}
                    name='image'
                    type='file'
                />

                </div>
                <div className={styles.inputBox}>
                    <select name="rating" value={rating} onChange={(e) => setRating(e.target.value)} className={inputStyle.rating}>
                    <option value="none" defaultValue hidden>
                    Select a Rating
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                </div>
                
            </form>  
        </div>
    )
}

export default CigarForm