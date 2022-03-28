import React, { useState } from 'react'


const CigarForm = (props) => {
    const {initialCigarName, initialDescription, initialImage, initialRating, onSubmitProp, errors} = props
    const [cigarName, setCigarName] = useState(initialCigarName)
    const [description, setDescription] = useState(initialDescription)
    const [image, setImage] = useState(initialImage)
    const [rating, setRating] = useState(initialRating)

    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({cigarName, description, image, rating})
        setCigarName("")
        setDescription("")
        setImage("")
        setRating(0)
    }


    return (
        <div className='formContainer'>
            <form  onSubmit={submitHandler}>
                <div>
                    <label>Cigar Name</label>
                    <input 
                    value={cigarName}
                    type="text"
                    onChange={(e)=> setCigarName(e.target.value)}
                    name='cigarName'
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    name='description'
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input 
                    value={image}
                    type="text"
                    onChange={(e)=> setImage(e.target.value)}
                    name='image'
                    />
                </div>
                <div>
                    <select name="raing" value={rating} onChange={(e)=> setRating(e.target.value)}>
                        <option value="none" defaultValue hidden>Select a Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CigarForm