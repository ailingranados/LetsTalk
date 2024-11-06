import React from 'react';
import './CSS/Estrellas.css';

const Estrellas = ({ score }) => {
    const totalStars = 5;
    return (
        <div className="stars">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} className={index < score ? 'star filled' : 'star'}>
                    ★
                </span>
            ))}
        </div>
    );
};
export default Estrellas;