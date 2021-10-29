import React from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { NewMainCarousel } from '../../components/NewMainCarousel';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { eventbg } from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';

export const MyBBAllEvents: React.FC = () => {
  const history = useHistory();

  const navigateToDetail = () => {
    history.push(ROUTER_URL_CONSTANT.MY_BB_EVENT_DETAIL);
  };
  return (
    <div>
      <Header />
      <Container className="mt-140">
        <Breadcrumb>
          <Breadcrumb.Item active>My BB</Breadcrumb.Item>
          <Breadcrumb.Item active>Events</Breadcrumb.Item>
        </Breadcrumb>
        <h3 className="content-caption">My BB - Events</h3>
      </Container>
      <NewMainCarousel
        groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS}
      />
      {/* events */}
      <div className="events-section">
        <Container>
          <Row className="mb-4">
            <Col md={12}>
              <div className="heading">Events</div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <div className="heading">Ongoing Events</div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div
                className="event-card"
                role="button"
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={navigateToDetail}
              >
                <img className="img-fluid" src={eventbg} alt="event-name" />
                <div className="event-card-description">
                  <div className="title-block">
                    <div className="event-card-description-title">
                      Ramoji Kid’s Festival
                    </div>
                    <div className="event-card-description-detail">
                      22 Jun 2020 | 03:00 PM
                    </div>
                  </div>
                  <div className="event-card-description-detail">BOOK NOW</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
