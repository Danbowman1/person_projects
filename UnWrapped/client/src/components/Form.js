import React, { useState } from 'react'
import axios from 'axios'



const CigarForm = (props) => {
    const {initialCigarName,initialBrand ,initialDescription, initialImage, initialRating, onSubmitProp, errors} = props
    const [cigarName, setCigarName] = useState(initialCigarName)
    const [brand, setBrand] = useState(initialBrand)
    const [description, setDescription] = useState(initialDescription)
    const [image, setImage] = useState(null)
    const [rating, setRating] = useState(initialRating)

    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     onSubmitProp({cigarName, brand, description, image, rating})
    //     setCigarName("")
    //     setBrand("")
    //     setDescription("")
    //     setImage("")
    //     setRating(0)

    // }

    const submitHandler2 = (e) => {
        e.preventDefault()
        const formData = new FormData();
        let newArr = [];
        //********* HERE IS THE CHANGE ***********
        for (let i = 0; i < image.length; i++) {
            console.log(i)
            formData.append('pictureList', image[i]);

        }
    
        
        // console.log(formData.get('pictureList'));
        // console.log(formData.get('pictureList').name);
        // console.log(formData)

        // console.log({yo}, ...formData)


        // let {yo} = formData

        // console.log(yo)

  
        // console.log(image)

        axios
            .post('http://localhost:8000/api/cigars', 
                formData,
            )
            .then((res) =>{
                console.log(res.data)
            } );

    
        // onSubmitProp({cigarName, brand, description, image, rating})
        // setCigarName("")
        // setBrand("")
        // setDescription("")
        // setImage("")
        // setRating(0)

    }

    return (
        <div className='formContainer'>
            {/* <form onSubmit={submitHandler2} encType="multipart/form-data" method='POST' action='uploadpicture'> */}
            <form onSubmit={submitHandler2} encType="multipart/form-data">
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
                <div className='description'>
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
                    type="file"
                    onChange={(e)=>{
                        console.log(e.target.files)
                        console.log(e.target.files[0])
                        setImage(e.target.files)
                    
                    }}
                    multiple
                    name='pictureList'
                    />
                </div>
                <div>
                    <select name="raing" value={rating} onChange={(e)=> setRating(e.target.value)}>
                        <option value="none" defaultValue hidden>Select a Rating</option>
                        <option value="0">0</option>
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