import React from "react";
import "./cta.css";
import Card from "./Card";
// import OurServices from "../OurServices";

const CTA = ({ card1, card2, card3 }) => (
  <div className="clinic_banner">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <div className="clinic_title">
            <h2>How to get our service</h2>
          </div>
          <div className="clinic_sub_title">
            <p>Just follow this simple service?</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-12 col-sm-4">
              <Card icon={card1.icon} text={card1.text} />
            </div>
            <div className="col-12 col-sm-4">
              <Card icon={card2.icon} text={card2.text} />
            </div>
            <div className="col-12 col-sm-4">
              <Card icon={card3.icon} text={card3.text} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CTA;
