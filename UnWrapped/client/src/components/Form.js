import React, { useState } from 'react'



const CigarForm = (props) => {
    const {initialCigarName,initialBrand ,initialDescription, initialImage, initialRating, onSubmitProp, errors} = props
    const [cigarName, setCigarName] = useState(initialCigarName)
    const [brand, setBrand] = useState(initialBrand)
    const [description, setDescription] = useState(initialDescription)
    const [image, setImage] = useState(initialImage)
    const [rating, setRating] = useState(initialRating)

    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({cigarName, brand, description, image, rating})
        setCigarName("")
        setBrand("")
        setDescription("")
        setImage("")
        setRating(0)
        window.location.reload(false);
    }


    return (
        <div className='formContainer'>
            <form  onSubmit={submitHandler}>
                <div className="cigarLabel">
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
                        <label>Brand</label>
                        <input 
                        value={brand}
                        type="text"
                        onChange={(e)=> setBrand(e.target.value)}
                        name='brand'
                        />
                    </div>
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
                
                <button className='submitBtn'>Submit</button>
            </form>
        </div>
    )
}

export default CigarForm