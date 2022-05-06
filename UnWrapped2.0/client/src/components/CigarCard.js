import React, { useEffect } from 'react'
import styles from '../styles/CigarCard.module.css'



const CigarCard = (props) => {

    const { brand, name, description, img, rating } = props

    

    return (
        
                <div className={styles.container}>
                    <div className={styles.cardHeader}>
                        <p>{brand}</p>
                        <p>{name}</p>
                    </div>
                    <img src={img} alt="cigar" className={styles.cardImg} />
                    <p className={styles.description}>{description}</p>
                    <p className={styles.rating}>Rating: {rating}/5</p>
                    
                </div>
        
    )
}

export default CigarCard