import React, { useState, useEffect } from "react";
import axios from 'axios';
import ServiceCard from "../../components/serviceComponents/ServiceCard";
import "./services.css";
import Banner from "../../components/serviceComponents/Banner";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3030/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  return (
    <>
      <div className="container mt-5" id="service">
      <div className="row justify-content-between">
        <div className="col-12 col-md-6 col-lg-4 mb-4 text-left service_text_main">
          <h1>What Makes Us More Special </h1>
        </div>
        <div className="col-12 col-md-6 col-lg-4 mb-4 text-right service_text">
          <h1>
            Key <span>Features</span>
          </h1>
        </div>
      </div>
        <div className="row justify-content-center">
          {services.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="service-card" 
              />
            </div>
          ))}
        </div>
      </div>
      <Banner />
    </>
  );
}

export default Service;
