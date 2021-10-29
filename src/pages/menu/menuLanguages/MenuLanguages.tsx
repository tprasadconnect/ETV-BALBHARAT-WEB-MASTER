/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { backIcon } from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { languages } from '../../../services/languages/getLanguages';
import { selectors } from '../../../store/languages';
import { Loader } from '../../../components/Loader';
import { selectLanguageActionTypes as languageGet } from '../../../store/selectLanguage';
import { setItem } from '../../../utils/storage';

export function MenuLanguages() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common', 'menu']);

  const [showLoader, setShowLoader] = useState(false);

  const getLanguageState = useSelector(selectors.getLanguageState);
  const languagesList = getLanguageState.data && getLanguageState.data;
  const useEffectOnMountLangList = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getLanguageState]);
  };
  useEffectOnMountLangList(() => {
    setShowLoader(getLanguageState.loader);
  });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = { languageid: '' };
    dispatch(languages(params));
  });
  const handleLanguageClick = (langguageObject) => {
    setItem('bbUserLanguageId', langguageObject);
    dispatch({
      type: languageGet.SELECT_LANGUAGE_SUCCESS_ACTION,
      payload: { data: langguageObject },
    });
    history.push(ROUTER_URL_CONSTANT.HOME);
  };

  return (
    <div className="menuLanguages">
      <div className="main-background content-padding d-flex align-items-center">
        <div className="w-100">
          <Row>
            <Col md={1} xs={6} className="d-none d-lg-block" />
            <Col md={10}>
              <div className="edit-account__container">
                <div className="edit-account__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image alt="" src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.MENU}>
                    <span className="edit-account__back-btn__back-text">
                      {t('common:back')}
                    </span>
                  </Link>
                </div>

                <Container>
                  <Row>
                    {languagesList &&
                      languagesList.map((language) => {
                        const { lang_id, lang_name_en, lang_image } = language;
                        return (
                          <Col md={3} sm={3} xs={6} key={lang_id}>
                            {/* <div
                              className={`menuLanguages__container${
                                i === 0 ? '-active' : ''
                              }`}
                            > */}
                            <div
                              className="menuLanguages__container"
                              onClick={() => handleLanguageClick(language)}
                              aria-hidden="true"
                            >
                              <div>
                                <Image
                                  src={lang_image}
                                  alt={lang_name_en}
                                  className="menuLanguages__img"
                                />
                              </div>
                              <div className="menuLanguages__title">
                                {lang_name_en}
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>
                  {/* <Row>
                    <div className="col-md-12">
                      <Button className="btn-pink float-right">
                        <Link
                          to={ROUTER_URL_CONSTANT.ACCOUNT}
                          className="whiteText"
                        >
                          {t('common:select')}
                        </Link>
                      </Button>
                    </div>
                  </Row> */}
                </Container>
              </div>
            </Col>
            <Col md={1} xs={6} className="d-none d-lg-block" />
          </Row>
        </div>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
