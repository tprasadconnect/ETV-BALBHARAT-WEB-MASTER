import React from 'react';
import { Tab, Nav, Row, Col, Button } from 'react-bootstrap';
import {
  show1,
  show2,
  show3,
  show4,
  show5,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';

export const Collections: React.FC = () => {
  return (
    <div className="tone-card shows">
      <h2 className="block-title">Collections</h2>
      <Tab.Container id="left-tabs-example" defaultActiveKey="wallpapers">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="wallpapers">Wallpapers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sound-clips">Sound Clips</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="merchandise">Merchandise</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="games">Games</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="wallpapers">
            <Row>
              <Col md={3} xs={6}>
                <div className="show-card">
                  <div className="banner-img">
                    <img
                      className="img-fluid"
                      alt="show-card-img"
                      src={show1}
                    />
                    <div className="banner-img-hover-action">
                      <div className="play-btn">
                        <img
                          className="img-fluid"
                          alt="show-card-img"
                          src={tplayYellowIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="show-card">
                  <div className="banner-img">
                    <img
                      className="img-fluid"
                      alt="show-card-img"
                      src={show2}
                    />
                    <div className="banner-img-hover-action">
                      <div className="play-btn">
                        <img
                          className="img-fluid"
                          alt="show-card-img"
                          src={tplayYellowIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="show-card">
                  <div className="banner-img">
                    <img
                      className="img-fluid"
                      alt="show-card-img"
                      src={show3}
                    />
                    <div className="banner-img-hover-action">
                      <div className="play-btn">
                        <img
                          className="img-fluid"
                          alt="show-card-img"
                          src={tplayYellowIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="show-card">
                  <div className="banner-img">
                    <img
                      className="img-fluid"
                      alt="show-card-img"
                      src={show4}
                    />
                    <div className="banner-img-hover-action">
                      <div className="play-btn">
                        <img
                          className="img-fluid"
                          alt="show-card-img"
                          src={tplayYellowIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3} xs={6}>
                <div className="show-card">
                  <div className="banner-img">
                    <img
                      className="img-fluid"
                      alt="show-card-img"
                      src={show5}
                    />
                    <div className="banner-img-hover-action">
                      <div className="play-btn">
                        <img
                          className="img-fluid"
                          alt="show-card-img"
                          src={tplayYellowIcon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={12} className="text-center">
                <Button className="btn-yeelow btn btn-primary">
                  Load More
                </Button>
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="sound-clips">Sound Clips content here</Tab.Pane>
          <Tab.Pane eventKey="merchandise">Merchandise content here</Tab.Pane>
          <Tab.Pane eventKey="games">Games content here</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};
