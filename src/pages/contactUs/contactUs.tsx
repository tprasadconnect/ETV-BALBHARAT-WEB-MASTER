/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import GoogleMapReact from 'google-map-react';
import { Footer } from '../appFooter/Footer';
import { Header } from '../Header/Header';
import {
  Phone,
  Mail,
  Location,
  mapMarker,
} from '../../constants/iconImageConstant';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { faq } from '../../services/faq/faq';

import { selectors as contactUsSelectors } from '../../store/contactUs';
import { contactUs } from '../../services/contactUs/contactUs';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';

interface IAnyComp {
  text: string;
  lat: number;
  lng: number;
}

const Marker = ({ text }: IAnyComp) => (
  <img src={text} alt="marker" className="mapsMarker" />
);

export const ContactPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const contactUsState = useSelector(contactUsSelectors.getContactUsState);
  const contactUsData = contactUsState.data && contactUsState.data[0];

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
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMountCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });

  return (
    <>
      <Header />
      <div className="container channelschedule helpAndSupport">
        <h1 className="text-center text-uppercase title_schedule">
          {t('menu:contact')}
        </h1>

        <Row className="align-items-center">
          <Col sm={6} xs={12}>
            <Row>
              <Col className="bbAddress" xs={12}>
                <Row className="mb-2">
                  <Col md={2} sm={2} xs={2}>
                    <Image src={Phone} alt="" />
                  </Col>
                  <Col md={10} sm={10} xs={10}>
                    {contactUsData && contactUsData.contactno}
                  </Col>
                </Row>
              </Col>
              <Col className="bbAddress" xs={12}>
                <Row className="mb-2">
                  <Col md={2} sm={2} xs={2}>
                    <Image src={Mail} alt="" />
                  </Col>
                  <Col md={10} sm={10} xs={10}>
                    {contactUsData && contactUsData.email}
                  </Col>
                </Row>
              </Col>
              <Col className="bbAddress" xs={12}>
                <Row className="mb-2">
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

          <Col sm={6} xs={12}>
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
      </div>
      <Footer />
    </>
  );
};
