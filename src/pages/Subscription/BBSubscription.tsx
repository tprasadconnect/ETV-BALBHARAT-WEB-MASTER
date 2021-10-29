import React, { useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import {
  logoImage,
  rightArrowBtn,
  topArrowBtn,
} from '../../constants/iconImageConstant';

export const BBSubscription: React.FC = () => {
  const history = useHistory();
  const [basicDetailsShow, setBasicDetailsShow] = useState(true);
  const [alphaDetailsShow, setAlphaDetailsShow] = useState(true);

  const logoClick = () => {
    history.push(ROUTER_URL_CONSTANT.HOME);
  };

  const showBasicDetails = () => {
    setBasicDetailsShow(!basicDetailsShow);
  };

  const showAlphaDetails = () => {
    setAlphaDetailsShow(!alphaDetailsShow);
  };

  const continueBasic = () => {
    history.push(ROUTER_URL_CONSTANT.PROFILE_BUILDER);
  };

  return (
    <div>
      <div className="subscription">
        <div className="main-background">
          <div className="content-padding pb-0">
            <Row>
              <Col md={6}>
                <div id="welcomeBanner">
                  <div className="welcome-banner">
                    <div className="welcome-banner__logo">
                      <Image
                        src={logoImage}
                        onClick={logoClick}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Container className="subscription-block d-none d-lg-block">
            <Row className="align-items-center pb-5">
              <Col md={3}>
                <div className="welcome-banner__L-Text2">
                  Choose your subscription
                </div>
                <p className="welcome-banner__L-Text3 pb-0 mb-0">
                  Please select a subscription plan <br /> that is the best
                  suitable for you.
                </p>
              </Col>

              <Col md={4} className="pr-0">
                <div className="basic-plan-card">
                  <div className="plan-header">
                    <h5 className="plan-title">Basic</h5>
                    <p className="plan-detail">
                      Get Free Instant Access To Your Balbharat
                    </p>
                  </div>
                  <div className="plan-body">
                    <div className="plan-body-title">What’s included</div>
                    <ul className="plan-items">
                      <li>Watch unlimited trailers</li>
                      <li>Watch 2 minutes of shows and movies</li>
                      <li>Limited Access To BB &amp; Me and BB Club*</li>
                      <li>
                        Watch content in English + 11 other regional languages
                      </li>
                      <li>Good Content Quality Upto Full Hd (1080p)</li>
                    </ul>
                    <div className="coming-soon">*Coming Soon</div>
                    <Button
                      variant="secondary"
                      className="btn-md btn-blue w-100 d-block"
                      type="submit"
                      onClick={continueBasic}
                    >
                      Continue as Basic
                      <img
                        className="ml-2"
                        src={rightArrowBtn}
                        alt="right-arrow"
                      />
                    </Button>
                  </div>
                </div>
              </Col>

              <Col md={5} className="pl-0">
                <div className="alpha-plan-card">
                  <div className="plan-header">
                    <h5 className="plan-title">
                      Get More With <span>Alpha!</span>
                    </h5>
                    <p className="plan-detail">
                      Get Free Instant Access To Your Balbharat
                    </p>
                  </div>
                  <div className="plan-body">
                    <div className="premium-feature">
                      Everything in the Basic plan plus more!!!
                    </div>
                    <div className="plan-body-title">What’s included</div>
                    <ul className="plan-items">
                      <li>Watch unlimited shows and movies</li>
                      <li>Unlimited Access To BB &amp; Me and BB Club*</li>
                      <li>Access content in upto 2 different devices</li>
                      <li>See less Ads</li>
                      <li>Get Parental Control</li>
                      <li>Download content and watch anytime</li>
                      <li>Cancel your subscription at any time</li>
                    </ul>
                    <div className="coming-soon">*Coming Soon</div>
                    <div className="subscription-plan">
                      <div className="plan-list">
                        <input
                          type="radio"
                          name="plans"
                          id="alpha-plan-1"
                          defaultChecked
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="checkbox-plan" htmlFor="alpha-plan-1">
                          Annually <br />
                          <span>₹299</span>
                        </label>
                      </div>
                      <div className="plan-list popular">
                        <input type="radio" name="plans" id="alpha-plan-2" />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="checkbox-plan" htmlFor="alpha-plan-2">
                          6 months <br />
                          <span>₹149</span>
                        </label>
                      </div>
                      <div className="plan-list">
                        <input type="radio" name="plans" id="alpha-plan-3" />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="checkbox-plan" htmlFor="alpha-plan-3">
                          3 months <br />
                          <span>₹79</span>
                        </label>
                      </div>
                      <div className="plan-list">
                        <input type="radio" name="plans" id="alpha-plan-4" />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="checkbox-plan" htmlFor="alpha-plan-4">
                          1 month <br />
                          <span>₹29</span>
                        </label>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="btn-md btn-yellow w-100 d-block"
                      type="submit"
                    >
                      Proceed with Alpha
                      <img
                        className="ml-2"
                        src={rightArrowBtn}
                        alt="right-arrow"
                      />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="subscription-block d-block d-lg-none">
            <Row className="align-items-center mt-5 pt-5 pb-5">
              <Col md={12}>
                <div className="welcome-banner__L-Text2">
                  Choose your subscription
                </div>
                <p className="welcome-banner__L-Text3 pb-0 mb-3">
                  Please select a subscription plan <br /> that is the best
                  suitable for you.
                </p>
              </Col>

              <Col md={12}>
                <div className="basic-plan-card">
                  <div className="plan-header">
                    <h5 className="plan-title">Basic</h5>
                    <p className="plan-detail">
                      Get Free Instant Access To Your Balbharat
                    </p>
                  </div>
                  <div className="plan-body">
                    <Button
                      variant="secondary"
                      className="btn-md btn-blue mb-4"
                      type="submit"
                      onClick={continueBasic}
                    >
                      Continue as Basic
                      <img
                        className="ml-2"
                        src={rightArrowBtn}
                        alt="right-arrow"
                      />
                    </Button>
                    <div
                      className={`plan-body-title arrow-${
                        basicDetailsShow ? 'up' : 'down'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={showBasicDetails}
                    >
                      What’s included
                      <img
                        className="ml-2"
                        src={topArrowBtn}
                        alt={`arrow-${basicDetailsShow ? 'up' : 'down'}`}
                      />
                    </div>
                    {basicDetailsShow && (
                      <>
                        <ul className="plan-items">
                          <li>Watch unlimited trailers</li>
                          <li>Watch 2 minutes of shows and movies</li>
                          <li>Limited Access To BB &amp; Me and BB Club*</li>
                          <li>
                            Watch content in English + 11 other regional
                            languages
                          </li>
                          <li>Good Content Quality Upto Full Hd (1080p)</li>
                        </ul>
                        <div className="coming-soon">*Coming Soon</div>
                      </>
                    )}
                  </div>
                </div>
              </Col>

              <Col md={12}>
                <div className="alpha-plan-card">
                  <div className="plan-header">
                    <h5 className="plan-title">
                      Get More With <span>Alpha!</span>
                    </h5>
                    <p className="plan-detail">
                      Get Free Instant Access To Your Balbharat
                    </p>
                  </div>
                  <div className="subscription-plan">
                    <div className="plan-list">
                      <label
                        className="checkbox-plan"
                        htmlFor="alpha-sm-plan-1"
                      >
                        <span>₹299</span>/Annually
                        <input
                          type="radio"
                          name="plans"
                          id="alpha-sm-plan-1"
                          defaultChecked
                        />
                        <span className="checkmark" />
                      </label>
                      <label
                        className="checkbox-plan"
                        htmlFor="alpha-sm-plan-2"
                      >
                        <span>₹149</span>/for six months
                        <input type="radio" name="plans" id="alpha-sm-plan-2" />
                        <span className="checkmark" />
                      </label>
                      <label
                        className="checkbox-plan"
                        htmlFor="alpha-sm-plan-3"
                      >
                        <span>₹79</span>/for three months
                        <input type="radio" name="plans" id="alpha-sm-plan-3" />
                        <span className="checkmark" />
                      </label>
                      <label
                        className="checkbox-plan"
                        htmlFor="alpha-sm-plan-4"
                      >
                        <span>₹29</span>/monthly
                        <input type="radio" name="plans" id="alpha-sm-plan-4" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <Button
                      variant="secondary"
                      className="btn-md btn-yellow"
                      type="submit"
                    >
                      Proceed with Alpha
                      <img
                        className="ml-2"
                        src={rightArrowBtn}
                        alt="right-arrow"
                      />
                    </Button>
                  </div>
                  <div className="plan-body">
                    <div
                      className={`plan-body-title arrow-${
                        alphaDetailsShow ? 'up' : 'down'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={showAlphaDetails}
                    >
                      What’s included
                      <img
                        className="ml-2"
                        src={topArrowBtn}
                        alt={`arrow-${alphaDetailsShow ? 'up' : 'down'}`}
                      />
                    </div>
                    {alphaDetailsShow && (
                      <>
                        <ul className="plan-items">
                          <li>Watch unlimited shows and movies</li>
                          <li>Unlimited Access To BB &amp; Me and BB Club*</li>
                          <li>Access content in upto 2 different devices</li>
                          <li>See less Ads</li>
                          <li>Get Parental Control</li>
                          <li>Download content and watch anytime</li>
                          <li>Cancel your subscription at any time</li>
                        </ul>
                        <div className="coming-soon">*Coming Soon</div>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};
