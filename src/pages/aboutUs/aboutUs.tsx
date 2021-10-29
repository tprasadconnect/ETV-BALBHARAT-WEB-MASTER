import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { Player } from '../../components/Player';
import { Footer } from '../appFooter/Footer';
import {
  aboutBG,
  closeIcon,
  mainVTImg,
} from '../../constants/iconImageConstant';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';
import { selectors } from '../../store/policyNotes';

export const AboutUs: React.FC = () => {
  const [show, setShow] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlImage, setUrlImage] = useState('');

  const handleClose = () => setShow(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const [aboutUs, setAboutUs] = useState({
    policy_description: ' ',
    video_url_details: [{ policy_video_url: '', policy_video_image: '' }],
  });
  const handleShow = (type) => {
    if (type === 'about') {
      setUrlValue(aboutUs?.video_url_details?.[0]?.policy_video_url);
      setUrlImage(mainVTImg);
      setShow(true);
    } else if (type === 'maskat') {
      setUrlValue(aboutUs?.video_url_details?.[1]?.policy_video_url);
      setUrlImage(aboutUs?.video_url_details?.[1]?.policy_video_image);
      setShow(true);
    }
    return true;
  };

  const bookmarkTime = history.location.search.split('=')[1]
    ? parseInt(history.location.search.split('=')[1], 10)
    : 0;
  const about = useSelector(selectors.getPolicyNotesState);
  const useEffectOnAboutUs = (effect: React.EffectCallback) => {
    React.useEffect(effect, [about]);
  };
  useEffectOnAboutUs(() => {
    for (let i = 0; i < about?.data?.length; i += 1) {
      if (about?.data?.[i]?.policy_id === '2') {
        setAboutUs(about?.data?.[i]);
      }
    }
  });
  let currentTimeFloorValue = 0;
  const onTimeUpdate = (currentTime: number) => {
    if (currentTimeFloorValue === Math.floor(currentTime))
      currentTimeFloorValue = Math.floor(currentTime);
  };
  const onPause = () => {};

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
  // useEffect(() => {
  //   document.title = 'About Us';
  // }, []);

  return (
    <div className="aboutHome">
      <Header />
      <div className="tone-block " style={{ marginBottom: '-50px' }}>
        <div
          className="tone-bg-section"
          style={{
            backgroundImage: `url(${aboutBG})`,
            position: 'fixed',
            width: '100%',
            height: '100%',
          }}
        />
        <div
          className="bg-gradient"
          style={{
            marginTop: '620px',
          }}
        >
          <Container>
            <div className="about-block text-center tone-card shows">
              {/* <h2 className="block-title">About etv balbharat</h2> */}
              <p className="mb-5">
                {aboutUs && (
                  /* eslint-disable react/no-danger */
                  <div
                    dangerouslySetInnerHTML={{
                      __html: aboutUs?.policy_description,
                    }}
                  />
                )}
              </p>

              <div
                className="video_player_thumb"
                onClick={() => handleShow('about')}
                aria-hidden="true"
              >
                <img
                  src={aboutUs?.video_url_details?.[0]?.policy_video_image}
                  alt="aboutvideo"
                  className="aboutvideo"
                />
              </div>
              <div
                className="video_player_thumb"
                onClick={() => handleShow('maskat')}
                aria-hidden="true"
              >
                <p>
                  <strong>BB Scope</strong>
                </p>
                <img
                  className="aboutvideo"
                  src={aboutUs?.video_url_details?.[1]?.policy_video_image}
                  alt="aboutvideo"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        className="p-0 video_player"
      >
        <Modal.Body className="p-0">
          <div className="close_button">
            <img
              src={closeIcon}
              alt=""
              className="img-fluid"
              aria-hidden="true"
              onClick={handleClose}
            />
          </div>
          <div className="about_player">
            <Player
              style={{ height: '450px', width: '100%' }}
              videoUrl={urlValue}
              bannerUrl={urlImage}
              watchedDuration={bookmarkTime}
              autoPlayVideo={false}
              handleTimeUpdate={onTimeUpdate}
              handleOnPause={onPause}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
