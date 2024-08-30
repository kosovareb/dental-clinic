import React from 'react';
import { Card } from 'react-bootstrap';
import '../../containers/services/services.css';

const ServiceCard = ({ icon, title, description }) => (
  <div className="d-flex justify-content-center">
    <Card className="service-card text-center" style={{ backgroundColor: '#f8f9fa' }}>
      <Card.Img variant="top" src={icon} alt={title} className="service-icon mb-3" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default ServiceCard;
