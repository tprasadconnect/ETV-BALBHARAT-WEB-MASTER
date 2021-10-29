import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  show3,
  show4,
  show5,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';

export const Movies: React.FC = () => {
  return (
    <div className="tone-card shows">
      <h2 className="block-title">movies</h2>
      <Row>
        <Col md={3} xs={6}>
          <div className="movie-card">
            <div
              className="movie-card-bg"
              style={{ backgroundImage: `url(${show3})` }}
            >
              <div className="play-btn">
                <img
                  className="img-fluid"
                  alt="show-img"
                  src={tplayYellowIcon}
                />
              </div>
            </div>
            <div className="movie-card-name">
              Abhimanyu: The Young Gamechanger
            </div>
          </div>
        </Col>
        <Col md={3} xs={6}>
          <div className="movie-card">
            <div
              className="movie-card-bg"
              style={{ backgroundImage: `url(${show4})` }}
            >
              <div className="play-btn">
                <img
                  className="img-fluid"
                  alt="show-img"
                  src={tplayYellowIcon}
                />
              </div>
            </div>
            <div className="movie-card-name">
              Abhimanyu: Gamechanger of Life
            </div>
          </div>
        </Col>
        <Col md={3} xs={6}>
          <div className="movie-card">
            <div
              className="movie-card-bg"
              style={{ backgroundImage: `url(${show5})` }}
            >
              <div className="play-btn">
                <img
                  className="img-fluid"
                  alt="show-img"
                  src={tplayYellowIcon}
                />
              </div>
            </div>
            <div className="movie-card-name">Abhimanyu: Childhood Life</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
