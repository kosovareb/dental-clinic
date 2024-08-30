import React from 'react';

import customer from '../../assets/customer.PNG';
import './header.css';

const Header = () => (
  <div className="container">
  <div className="clinic__header" id="home">
    <div className="clinic__header-content">
      
      <h1 >We Provide High Quality <span>Dental</span> Service</h1>
      <p> Appropriately embrace transparent materials via turnkey niche markets</p>

      <div className="clinic__header-content__input">
        <button type="button">Get Started</button>
        <button type="button">Learn More</button>
      </div>

      
    </div>

    <div className="clinic__header-image">
      <img src={customer} />
    </div>
  </div>
  </div>
  
);

export default Header;