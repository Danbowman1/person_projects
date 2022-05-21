import React, { useState, useRef, useContext } from 'react'
import MyContext from '../context/MyContext'
import styles from '../styles/CigarForm.module.css'
import inputStyle from '../styles/InputStyles.module.css'

const CigarForm = (props) => {

    const { onSubmitProp, initialBrand, initialName, initialDescription, initialRating, image } = props

    const context = useContext(MyContext)
   
    const [ brand, setBrand ] = useState(initialBrand)
    const [ name, setName ] = useState(initialName)
    const [ description, setDescription ] = useState(initialDescription)
    const [ rating, setRating ] = useState(initialRating)


    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ name, brand, description, rating })
        setBrand('')
        setName('')
        setDescription('')
        setRating('')
    }


    return (
        <div>
            <form onSubmit={submitHandler} className={styles.formStyle}>
                <div className={styles.cigarLabel}>
                    <div className={styles.inputBox}>
                        <label>Brand</label>
                        <input className={inputStyle.input}
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand ?? ''}
                            name='brand'
                            type='text'
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Name</label>
                        <input className={inputStyle.input}
                            onChange={(e) => setName(e.target.value)}
                            value={name ?? ''}
                            name='name'
                            type='text'
                        />
                    </div>
                    
                </div>
                <div className={styles.inputBox}>
                <label>Description</label>
                <textarea className={inputStyle.textArea}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description ?? ''}
                    name='description'
                />
                </div>
                
                
                <div className={styles.inputBox}>
                    <label>Image</label>
                    <input className={inputStyle.file}
                        onChange={(e)=>context.setImage(e.target.files[0])}
                        name='image'
                        type='file'
                        ref={image}
                    />
                </div>
                <div className={styles.inputBox}>
                    <select name="rating" value={rating ?? ''} onChange={(e) => setRating(e.target.value)} className={inputStyle.rating}>
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
                <input className={styles.inputBox} type='submit' />
            </form>  
        </div>
    )
}

export default CigarForm