/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import {
  Row,
  Col,
  Image,
  Accordion,
  Card,
  Form,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GoogleMapReact from 'google-map-react';
import {
  backIcon,
  Phone,
  Mail,
  Location,
  downArrow,
  upArrow,
  mapMarker,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';
import { faq } from '../../../services/faq/faq';
import { selectors } from '../../../store/faq';
import { selectors as contactUsSelectors } from '../../../store/contactUs';
import { Loader } from '../../../components/Loader';
import { contactUs } from '../../../services/contactUs/contactUs';
import { feedback } from '../../../services/feedback/feedback';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { selectors as feedbackSelectors } from '../../../store/feedback';
import { Toaster } from '../../../components/Toaster';

interface IAnyComp {
  text: string;
  lat: number;
  lng: number;
}

const Marker = ({ text }: IAnyComp) => (
  <img src={text} alt="marker" className="mapsMarker" />
);

export const HelpAndSupport = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const faqState = useSelector(selectors.getFaqState);
  const contactUsState = useSelector(contactUsSelectors.getContactUsState);
  const contactUsData = contactUsState.data && contactUsState.data[0];
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;
  const feedbackState = useSelector(feedbackSelectors.getFeedbackState);

  const [faqData, setFaqData] = React.useState<any[]>([]);
  const [showLoader, setShowLoader] = React.useState(false);
  const [feedbackComment, setFeedbackComment] = React.useState('');
  const [commentsError, setCommentsError] = React.useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });
  const [mLat, setMLat] = useState('');
  const [mLng, setMLng] = useState('');

  const mapLat = contactUsState.data && contactUsState.data[0].latitude;
  const mapLng = contactUsState.data && contactUsState.data[0].langitude;
  const defaultProps = {
    center: {
      lat: parseFloat(mLat),
      lng: parseFloat(mLng),
    },
    zoom: 15,
  };

  const useEffectOnMountMap = (effect: React.EffectCallback) => {
    React.useEffect(effect, [mapLat, mapLng]);
  };
  useEffectOnMountMap(() => {
    setMLat(mapLat);
    setMLng(mapLng);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params1 = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
    };
    dispatch(faq(params1));

    const params2 = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
    };
    dispatch(contactUs(params2));
  });

  const useEffectOnMountFeedback = (effect: React.EffectCallback) => {
    React.useEffect(effect, [feedbackState]);
  };
  useEffectOnMountFeedback(() => {
    if (feedbackState.data) {
      setFeedbackComment('');
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'success',
        description: 'Thank you for feedback',
      });
    }
    setShowLoader(feedbackState.loader);
  });

  const useEffectOnMountFaq = (effect: React.EffectCallback) => {
    React.useEffect(effect, [faqState]);
  };
  useEffectOnMountFaq(() => {
    if (faqState.data) {
      const faqDataArr = faqState.data && faqState.data;
      faqDataArr.forEach((el, i) => {
        if (i === 0) Object.assign(el, { isOpen: true });
        else Object.assign(el, { isOpen: false });
      });
      setFaqData(faqDataArr);
    }
    setShowLoader(faqState.loader);
  });

  const handleDropdownArrow = (id, isOpen) => {
    const arr = [...faqData];
    arr.forEach((el) => {
      if (el.faq_code === id) Object.assign(el, { isOpen: !isOpen });
      else Object.assign(el, { isOpen: false });
    });
    setFaqData(arr);
  };

  const handleFbComments = (e) => {
    setCommentsError(false);
    setFeedbackComment(e.target.value);
  };

  const handleFbSubmit = () => {
    if (feedbackComment) {
      const params = {
        userid,
        kidid: kidid || '',
        languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
        comments: feedbackComment,
        experianceid: '',
        type: API_REQ_PARAM_CONSTANTS.FEEDBACK_FAQ,
      };
      dispatch(feedback(params));
    } else {
      setCommentsError(true);
    }
  };

  return (
    <div className="helpAndSupport main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="helpAndSupport__container">
              <div className="helpAndSupport__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.MENU}>
                  <span className="helpAndSupport__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={3} sm={12} className="helpAndSupport__heading">
                  {t('menu:faq')}
                </Col>
              </Row>
              <Row className="pt-1  pl-sm-3">
                <Col sm={8} className="helpAndSupport__accordianCustom">
                  <Accordion defaultActiveKey="0">
                    {faqData &&
                      faqData.map((data, i) => {
                        return (
                          <Card key={data.faq_code}>
                            <Accordion.Toggle
                              as={Card.Header}
                              eventKey={`${i}`}
                              className="customHedder"
                              onClick={() =>
                                handleDropdownArrow(data.faq_code, data.isOpen)
                              }
                            >
                              {data.question}?
                              <Image
                                src={data.isOpen ? upArrow : downArrow}
                                alt="down arrow"
                                className="float-right"
                              />
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={`${i}`}>
                              <Card.Body className="customBody">
                                {data.answer}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        );
                      })}
                  </Accordion>
                </Col>
                <Col sm={4}>
                  <Row>
                    {/* <Col sm={12} xs={12}></Col> */}
                    <Col sm={12} xs={12}>
                      <Form>
                        <Form.Group controlId="">
                          <Form.Label className="help-fb-concern">
                            {t('menu:concern')}
                          </Form.Label>
                          <div className="help-fb-conntainer">
                            <Form.Control
                              placeholder={t('menu:yourConcern')}
                              as="textarea"
                              className="help-feedback-comments-input"
                              rows={3}
                              value={feedbackComment}
                              onChange={handleFbComments}
                            />
                            <div className="h-line" />
                            <button
                              className="fb-submit-btn"
                              type="button"
                              onClick={handleFbSubmit}
                            >
                              {t('menu:submitconcern')}
                            </button>
                          </div>
                          {commentsError && (
                            <span className="emoji-error">
                              {t('menu:commentsrequired')}
                            </span>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} xs={12}>
                      {t('menu:contact')}
                      <Row>
                        <Col className="bbAddress" xs={12}>
                          <Row>
                            <Col md={2} sm={2} xs={2}>
                              <Image src={Phone} alt="" />
                            </Col>
                            <Col md={10} sm={10} xs={10}>
                              {contactUsData && contactUsData.contactno}
                            </Col>
                          </Row>
                        </Col>
                        <Col className="bbAddress" xs={12}>
                          <Row>
                            <Col md={2} sm={2} xs={2}>
                              <Image src={Mail} alt="" />
                            </Col>
                            <Col md={10} sm={10} xs={10}>
                              {contactUsData && contactUsData.email}
                            </Col>
                          </Row>
                        </Col>
                        <Col className="bbAddress" xs={12}>
                          <Row>
                            <Col md={2} sm={2} xs={2}>
                              <Image src={Location} alt="" />
                            </Col>
                            <Col md={10} sm={10} xs={10}>
                              {contactUsData && contactUsData.address}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Container>
                      <Row className="map-container">
                        <Col sm={6} xs={6} className="mapdirections">
                          <span>{t('menu:mapdirections')}</span>
                        </Col>
                        <Col sm={6} xs={6} className="getdirections">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.google.com/maps/place/${defaultProps.center.lat},${defaultProps.center.lng}`}
                            className="getdirections"
                          >
                            {t('menu:getdirections')}
                          </a>
                        </Col>
                      </Row>
                    </Container>
                    <Col sm={12} xs={12}>
                      {mLat && (
                        <div className="gmap-container">
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: '', // Place API maps key here
                            }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                          >
                            <Marker
                              lat={parseFloat(mLat)}
                              lng={parseFloat(mLng)}
                              text={mapMarker}
                            />
                          </GoogleMapReact>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
      {showLoader && <Loader />}
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
    </div>
  );
};
