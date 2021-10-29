import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { ComingSoon } from '../../components/ComingSoon';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { eventbg } from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { NewMainCarousel } from '../../components/NewMainCarousel';

export const MyBB: React.FC = () => {
  const history = useHistory();

  const navigateToDetail = () => {
    history.push(ROUTER_URL_CONSTANT.MY_BB_EVENT_DETAIL);
  };

  const navigateMore = () => {
    history.push(ROUTER_URL_CONSTANT.MY_BB_ALLEVENT);
  };

  return (
    <div>
      <Header />
      <NewMainCarousel
        groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS}
      />
      <div className="my-bb-section">
        <Container>
          <Tab.Container id="tab-bb" defaultActiveKey="games">
            <Row>
              <Col md={3}>
                <h4 className="sub-heading">
                  BB Club <span />
                </h4>
                <Nav variant="pills" className="flex-md-column">
                  <Nav.Item>
                    <Nav.Link eventKey="games">Games</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="puzzles">Puzzles</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="challenges">Challenges</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="books">Books</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="audiobooks">Audio Books</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="rhymes">Rhymes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="colouringbanks">
                      Colouring Banks
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="games">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="puzzles">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="challenges">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="books">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="audiobooks">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="rhymes">
                    <ComingSoon />
                  </Tab.Pane>
                  <Tab.Pane eventKey="colouringbanks">
                    <ComingSoon />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
      {/* events */}
      <div className="events-section events-section-bg">
        <Container>
          <Row>
            <Col md={12} className="text-center">
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

            <Col md={12} className="text-center">
              <Button
                className="btn-yeelow btn btn-primary"
                onClick={navigateMore}
              >
                View More
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
