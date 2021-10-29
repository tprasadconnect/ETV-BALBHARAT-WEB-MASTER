import React from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { eventbg, location } from '../../constants/iconImageConstant';

export const MyBBEventDetails: React.FC = () => {
  return (
    <div>
      <Header />
      <Container className="mt-140">
        <Breadcrumb>
          <Breadcrumb.Item active>My BB</Breadcrumb.Item>
          <Breadcrumb.Item active>Events</Breadcrumb.Item>
          <Breadcrumb.Item active>Ramoji Kids Festival</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mt-3 mb-3">
          <Col md={12}>
            <img
              className="img-fluid w-100 eventbg"
              src={eventbg}
              alt="event-name"
            />
          </Col>
        </Row>
      </Container>
      {/* events */}
      <div className="events-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="event-title">Ramoji Kid’s Events</h3>
              <p className="event-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              </p>
              <div className="event-detail">
                Venue: <span className="mr-140">Ramoji Film City</span>
                <img src={location} alt="location" />
              </div>
              <div className="event-detail">
                Date &amp; Time: <span>28 JUN 2020, 03:00 PM</span>
              </div>
              <div className="event-detail">
                Contact info:{' '}
                <span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto: etvevents@balbharat.com"
                    title="etvevents@balbharat.com"
                  >
                    etvevents@balbharat.com
                  </a>
                </span>
              </div>
              <div className="event-detail">
                Cost: <span>499/- Per person</span>
              </div>
            </Col>
            <Col md={4}>
              <Form className="book-event">
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="username"
                    className="form-control"
                    defaultValue="Taran Cheerala"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control as="select" name="noofpersons" defaultValue="3">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="event-detail">
                    Rs: <span>1996/-</span>
                  </div>
                  <div className="event-detail">
                    <span>Excluding GST</span>
                  </div>
                </div>
                <Form.Group className="mb-5">
                  <Form.Check
                    className="d-flex align-items-center"
                    required
                    type="checkbox"
                    name="terms"
                    label="I accept Terms and Conditions"
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  className="btn-md btn-register w-100 d-block"
                  type="submit"
                >
                  Register now
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
