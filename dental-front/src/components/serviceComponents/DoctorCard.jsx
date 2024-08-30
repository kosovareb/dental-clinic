import React, { useEffect, useState } from 'react';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Card, Button, Row, Container, Spinner } from "react-bootstrap";
import axios from '../../api/apiClient';
import './style/doctorCard.css';

const DoctorCard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3030/doctor');
      setDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError('Error fetching doctors');
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="ourDoctors-background" style={{ backgroundColor: "#f8fafc" }}>
      <Container className="slide-container mt-5">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mt-5 mb-4 text-left service_text_main">
            <h1>Meet Some of Our Brains</h1>
          </div>
          <div className="col-12 col-md-6 col-lg-4 ms-auto mt-5 mb-4 text-right service_text">
            <h1>
              MEET OUR <span>Doctors</span>
            </h1>
          </div>
        </div>
        <Slide
          slidesToScroll={1}
          slidesToShow={1}
          indicators={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 4, slidesToScroll: 1 },
            },
            {
              breakpoint: 600,
              settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
          ]}
        >
          {doctors.map((doctor, index) => (
            <div key={index} className="each-slide">
              <Row className="justify-content-center">
                <Card
                  className="text-center m-3"
                  style={{
                    backgroundColor: "#f8fafc",
                    width: "100%",
                    height: "450px",
                    maxWidth: "280px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <div className="img-container">
                    <Card.Img
                      variant="top"
                      src={doctor.imgSrc}
                      alt={doctor.fullname}
                      className="rounded-circle doctor-img"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{doctor.fullname}</Card.Title>
                    <Card.Text style={{ fontSize: "1em", marginBottom: "10px" }}>
                      {doctor.specialized}
                      <br />
                      {doctor.university}
                    </Card.Text>
                  </Card.Body>
                  <div className="d-flex justify-content-center mb-5">
                    <Button
                      variant="outline-primary"
                      style={{ borderColor: "blue", width: "200px" }}
                    >
                      Appointment
                    </Button>
                  </div>
                </Card>
              </Row>
            </div>
          ))}
        </Slide>
      </Container>
    </div>
  );
};

export default DoctorCard;
