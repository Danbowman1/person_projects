import React, { useState, useRef } from 'react';
import axios from 'axios';

const CigarForm = (props) => {
    
    const {
    initialCigarName,
    initialBrand,
    initialDescription,
    initialImage,
    initialRating,
    onSubmitProp,
    errors,
    } = props;
    const ref =useRef()
    const [cigarName, setCigarName] = useState(initialCigarName);
    const [brand, setBrand] = useState(initialBrand);
    const [description, setDescription] = useState(initialDescription);
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(initialRating);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target.image.files[0];
        console.log('FILE', file);
        const reader = new FileReader();
        reader.onloadend = () => {
        console.log(reader.result);
        const imageData = reader.result;
        const cigar = {
            cigarName,
            brand,
            description,
            image: imageData,
            rating,
        };
        onSubmitProp(cigar);
        setCigarName('')
        setBrand('')
        setDescription('')
        ref.current.value = null
        setRating('')
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
    reader.onload = () => {
      //   axios
      //     .post('http://localhost:8000/api/cigars', {
      //       image: imageData,
      //       cigarName,
      //       brand,
      //       description,
      //       rating,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    };
    
    };

    return (
        <div className="formContainer">
        <form onSubmit={handleSubmit} action="">
            <div className="cigarLabel">
            <div>
                <label>Cigar Name</label>
                <input
                value={cigarName}
                type="text"
                onChange={(e) => setCigarName(e.target.value)}
                name="cigarName"
                />
                {
                    errors.cigarName?
                    <span className='errorMessage'>{errors.cigarName.message}</span>
                    :null
                }
            </div>
            <div>
                <label>Brand</label>
                <input
                value={brand}
                type="text"
                onChange={(e) => setBrand(e.target.value)}
                name="brand"
                />
                {
                    errors.brand?
                    <span className='errorMessage'>{errors.brand.message}</span>
                    :null
                }
            </div>
            </div>
            <div className="description">
            <label>Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
            />
            {
                    errors.description?
                    <span className='errorMessage'>{errors.description.message}</span>
                    :null
                }
            </div>
            <label >Image</label>
            <div className='fileInputContainer'>
            <input type="file" onChange={(e) => setImage(e.target.files)} name="image" id='file' ref={ref} />
                {
                    image === null?
                    <span className='imgWarning'>You must include a picture</span>
                    :null
                }
            </div>
            <div>
            <select name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
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
            {
                    errors.rating?
                    <span className='errorMessage'>{errors.rating.message}</span>
                    :null
                }
            </div>

            <button className="submitBtn">Submit</button>
        </form>
        </div>
    );
};

export default CigarForm;
