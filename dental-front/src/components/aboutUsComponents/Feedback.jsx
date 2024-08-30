import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './feedbaack.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const feedbacks = [
  {
    name: "Samantha Payne",
    rating: "★★★★★",
    feedback: "I've seen a lot of Dentists over my lifetime because I've had some serious dental issues. But my highest praise goes to Dr. Jonathon Doe and his staffs. I was always very anxious going to the dentist but this time at Digital Implant, my experience was so painless and relaxed their was no discomfort whatsoever.",
    imgSrc: "https://via.placeholder.com/150"
  },
  {
    name: "John Smith",
    rating: "★★★★☆",
    feedback: "I've seen a lot of Dentists over my lifetime because I've had some serious dental issues. But my highest praise goes to Dr. Jonathon Doe and his staffs. I was always very anxious going to the dentist but this time at Digital Implant, my experience was so painless and relaxed their was no discomfort whatsoever.",
   imgSrc: "https://via.placeholder.com/150"
  },
  {
    name: "Jane Doe",
    rating: "★★★★★",
    feedback: "The best dental experience I've ever had. Professional and caring.",
    feedback: "I've seen a lot of Dentists over my lifetime because I've had some serious dental issues. But my highest praise goes to Dr. Jonathon Doe and his staffs. I was always very anxious going to the dentist but this time at Digital Implant, my experience was so painless and relaxed their was no discomfort whatsoever.",
    imgSrc: "https://via.placeholder.com/150"
  }
];

const Feedback = () => {
  return (
    <div className="feedback-background">
      <Container className="feedback-container text-center">
        <h3 className="text-white">What our clients say about us</h3>
        <Slide
          slidesToScroll={1}
          slidesToShow={1}
          indicators={true}
          arrows={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
            {
              breakpoint: 600,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
          ]}
        >
          {feedbacks.map((feedback, index) => (
            <Row key={index} className="align-items-center justify-content-center mb-4">
              <Col md={4} className="d-flex justify-content-center">
                <Card className="text-center card-custom">
                  <Card.Img
                    variant="top"
                    src={feedback.imgSrc}
                    className="card-img-custom"
                  />
                  <Card.Body>
                    <Card.Title>{feedback.name}</Card.Title>
                    <Card.Text>
                      <span className="star-rating">{feedback.rating}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8} className="text-white">
                <p className="mt-4">{feedback.feedback}</p>
              </Col>
            </Row>
          ))}
        </Slide>
      </Container>
    </div>
  );
};

export default Feedback;
