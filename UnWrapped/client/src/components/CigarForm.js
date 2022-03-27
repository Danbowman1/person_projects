import React, { useState } from 'react'

const CigarForm = (props) => {
    const {initalCigarName, initialDescription, initialImage, onSubmitProp, errors} = props
    const [cigarName, setCigarName] = useState(initalCigarName)
    const [description, setDescription] = useState(initialDescription)
    const [image, setImage] = useState(initialImage)

    const submitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({cigarName, description, image})
        setCigarName("")
        setDescription("")
        setImage("")
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Cigar Name:</label>
                    <input 
                    type="text"
                    onChange={(e)=> setCigarName(e.target.value)}
                    name='cigarName'
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input 
                    type="text"
                    onChange={(e)=> setDescription(e.target.value)}
                    name='cigarName'
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input 
                    type="text"
                    onChange={(e)=> setImage(e.target.value)}
                    name='cigarName'
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CigarForm