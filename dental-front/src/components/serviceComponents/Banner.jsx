import React from 'react';
import './banner.css';

const Banner = () => (
  <div className="clinic_banner">
    <div className="container">
      <div className="text-center text-banner">
        <h1 className="mb-4">Let Us Brighten <span>Your Smile!</span></h1>
        <p className="mb-5">
          Helping patients achieve good dental health & a beautiful smile is a privilege & responsibility. For over 30 years, we have proudly provided the best dental experience in New York. Our comfort-first approach is designed to meet the needs of you & your entire family.
        </p>
        <button className="btn btn-outline-light btn-lg">Make an Appointment</button>
      </div>
    </div>
  </div>
);

export default Banner;
