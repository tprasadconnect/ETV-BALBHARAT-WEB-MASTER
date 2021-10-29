import React, { useState } from 'react';
import {
  Breadcrumb,
  Button,
  Col,
  Container,
  Modal,
  Row,
} from 'react-bootstrap';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import {
  closeIcon,
  eventbg,
  show1,
  show2,
  show3,
  show4,
} from '../../constants/iconImageConstant';
import { HorizontalScroll } from '../../components/HorizontalScroll';

export const MyBBEventClosed: React.FC = () => {
  const [selectedImgs, setSelectedImage] = useState([]);
  const [show, setShow] = useState(false);

  const Images = (list: any) =>
    list.map((el: any) => {
      return (
        <div key={el.id}>
          <img className="w-100" src={el.imageUrl} alt="large-view" />
        </div>
      );
    });

  const imgListItem = Images([
    { id: Math.random(), imageUrl: show1 },
    { id: Math.random(), imageUrl: show2 },
    { id: Math.random(), imageUrl: show3 },
    { id: Math.random(), imageUrl: show4 },
  ]);

  const handleClose = () => {
    setShow(false);
    setSelectedImage([]);
  };

  const openImg = () => {
    setShow(true);
    setSelectedImage(imgListItem);
  };

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
          <Row className="align-items-center mb-5">
            <Col md={8}>
              <h3 className="event-title mb-0">Ramoji Kid’s Events</h3>
              <p className="event-closed-date">22 Jun 2020 | 03:00 PM</p>
            </Col>
            <Col md={4}>
              <Button
                variant="secondary"
                className="btn-md btn-register d-block disabled ml-auto"
                type="button"
                style={{ opacity: 0.3 }}
              >
                EVENT CLOSED
              </Button>
            </Col>
          </Row>
          <hr />
          <Row className="thumbnail-events align-items-center mt-5">
            <Col md={12}>
              <div className="heading">Event Gallery</div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show1} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show2} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show3} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show4} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show1} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show2} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show3} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show4} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show1} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show2} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show3} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show4} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show1} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show2} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show3} alt="event-name" />
              </div>
            </Col>
            <Col md={3}>
              <div
                className="thumbnail-img"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={openImg}
              >
                <img className="img-fluid" src={show4} alt="event-name" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        dialogClassName="modal-gallery"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <div
            className="close-btn"
            role="button"
            onClick={handleClose}
            onKeyPress={() => {}}
            tabIndex={0}
          >
            <img src={closeIcon} alt="close" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <HorizontalScroll menu={selectedImgs} />
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};
