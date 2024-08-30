import React from "react";
import "./aboutUs.css";
import history from "../../assets/history.PNG";

const AboutUs = () => (
  <div className="history-section container my-5 " id="aboutUs">
    <div className="row justify-content-between">
      <div className="col-12 col-md-6 col-lg-4 mb-4 text-right service_text">
        <h1>
          WHO <span>WE ARE</span>
        </h1>
      </div>
      <div className="col-12 col-md-6 col-lg-4 mb-4 text-left service_text_main">
        <h1> Our Glorious <span>History</span> </h1>
      </div>
    </div>
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="about-image">
          <img src={history} alt="Dentist with patient" className="img-fluid" />
        </div>
      </div>
      <div className="col-md-6">
        <div className="text-container">
          <h2>Our history</h2>
          <p>
            Dentics is a well-known name in dental and oral care in New York.
            The journey of this institution started in 1990 under the hands of
            Dr. Jonathon Doe, Gold Medalist of Harvard University. Dentics
            dental center has been leading the way in dental treatment in USA
            for more than 30 years in keeping with the evolution of time and the
            modernization of the era.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;
