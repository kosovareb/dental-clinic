import React from 'react';
import './cta.css';

const Card = ({ icon, text }) => {
    return (
      <div className="card">
        <div className="card-icon">{icon}</div>
        <div className="card-text">{text}</div>
      </div>
    );
  };

  export default Card;

