import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css"; 
import logo from '../../assets/logoo.PNG'

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4">
          <Col md={3} xs={12}>
            <div className="footer-logo">
              <div className="logo d-flex align-items-center">
                <img
                  src={logo}
                  alt="Dentics Logo"
                  className="mb-2 me-3"
                />
                <h4>Dentics</h4>
              </div>
              <p className="mt-3">
                Dentics is a well-known name in dental and oral care in New
                York. The journey of this institution started in 1990.
              </p>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-info">
              <h5>We are welcoming you</h5>
              <p className="p-info">Want to visit our clinic?</p>
              <p>Saturday - Thursday</p>
              <p>10 am - 9 pm</p>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-links">
              <h5>Important link</h5>
              <div className="footer-link-columns">
                <ul>
                  <li>
                    <a href="#facebook">Facebook</a>
                  </li>
                  <li>
                    <a href="#twitter">Twitter</a>
                  </li>
                  <li>
                    <a href="#instagram">Instagram</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#career">Career</a>
                  </li>
                  <li>
                    <a href="#support">Support</a>
                  </li>
                  <li>
                    <a href="#privacy">Privacy policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="footer-contact">
              <h5>Say hello to us</h5>
              <p>
                <a href="mailto:hello@reallygreatsite.com">
                  hello@reallygreatsite.com
                </a>
              </p>
              <p>123 Anywhere St., Any City, NY 39200</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
