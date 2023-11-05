import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import {
    FaGift,
    FaHeadphones,
    FaPaypal,
    FaServer,
    FaTruck,
  } from "react-icons/fa6";
const Services = () => {
  return (
    <section className="py-5">
          <Container>
            <Row className="align-items-center  justify-content-md-center justify-content-xs-start">
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-start"
              >
                <div className="ico px-3">
                  <FaTruck size={35} />
                </div>
                <div className="text">
                  <h4>Free Shipping</h4>
                  <span>from all orders over $100</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-start"
              >
                <div className="ico px-3">
                  <FaGift size={35} />
                </div>
                <div className="text">
                  <h4>Daily Surprises Offers</h4>
                  <span>save up to 25% off</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-start"
              >
                <div className="ico px-3">
                  <FaHeadphones size={35} />
                </div>
                <div className="text">
                  <h4>Support 24/7</h4>
                  <span>shop with an export</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-start"
              >
                <div className="ico px-3">
                  <FaServer size={35} />
                </div>
                <div className="text">
                  <h4>Affordable Prices</h4>
                  <span>get factory direct price</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-start"
              >
                <div className="ico px-3">
                  <FaPaypal size={35} />
                </div>
                <div className="text">
                  <h4>Secure Payment</h4>
                  <span>100% protected payments</span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
  )
}

export default Services