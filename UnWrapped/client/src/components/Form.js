import React, { useState } from 'react';
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
          </div>
          <div>
            <label>Brand</label>
            <input
              value={brand}
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              name="brand"
            />
          </div>
        </div>
        <div className="description">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files)} name="image" />
        </div>
        <div>
          <select name="raing" value={rating} onChange={(e) => setRating(e.target.value)}>
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

        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default CigarForm;
