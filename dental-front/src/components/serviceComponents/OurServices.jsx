import React from "react";
import service from "../../assets/our-service.PNG";
import "./ourService.css";
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const OurServices = () => (
  <Container className="mt-5 service_content">
    <Row>
      <Col xs={12} md={6}>
        <h1 className="title-text">
          Always <span className="text-warning">Lough </span>
          Whenever Its Possible
        </h1>
      </Col>
      <Col xs={12} md={6}>
        <p className="mt-4 description">
          We also offer treatments that improve the appearance of your smile
          giving you the confidence boost you deserve. The process or our
          treatment below.
        </p>
      </Col>
      <Col xs={12} md={6}>
        <img src={service} alt="Doctor" className="img-fluid service-image" />
      </Col>
      <Col xs={12} md={6} className="whp-content">
        <h3 className="title-wwp">WHAT WE PROVIDE</h3>
        <Row>
          <Col xs={12} md={6}>
          <ul className="list-unstyled">
              <li><FaCheckCircle className="icon" /> Check ups</li>
              <li><FaCheckCircle className="icon" /> Cosmetic dentistry</li>
              <li><FaCheckCircle className="icon" /> Orthodontics</li>
              <li><FaCheckCircle className="icon" /> Preventative checks</li>
            </ul>
          </Col>
          <Col xs={12} md={6}>
            <ul className="list-unstyled">
              <li><FaCheckCircle className="icon" /> Emergencies</li>
              <li><FaCheckCircle className="icon" /> Dental implants</li>
              <li><FaCheckCircle className="icon" /> Children’s dentistry</li>
              <li><FaCheckCircle className="icon" /> Telephone consultations</li>
            </ul>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default OurServices;
  