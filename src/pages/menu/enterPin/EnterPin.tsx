import React, { useState } from 'react';
import { Col, Row, Image, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { backIcon } from '../../../constants/iconImageConstant';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';
import { Loader } from '../../../components/Loader';
import { Toaster } from '../../../components/Toaster';

export function EnterPin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'menu']);

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const [pin, setPin] = useState('');
  const [isPinError, setIsPinError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [pinFromPp, setPinFromPp] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState.data]);
  };
  useEffectOnMount(() => {
    if (userStoreState.data) {
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });
  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const useEffectOnMountPP = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMountPP(() => {
    if (parentProfileState.data) {
      setPinFromPp(parentProfileState.data.pin);
    }
    setShowLoader(parentProfileState.loader);
  });

  const handleOtpChange = (e: any) => {
    setPin(e);
    if (e.toString().length === 4) {
      setIsPinError(false);
    }
  };

  const handleSubmitPin = () => {
    if (pin.toString().length !== 4) {
      setIsPinError(true);
    } else if (parseInt(pin, 10) === parseInt(pinFromPp, 10)) {
      history.push(ROUTER_URL_CONSTANT.SUB_SETTINGS);
    } else {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: t('menu:incorrectpin'),
      });
    }
  };

  return (
    <div className="enterPin main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="enterPin__container">
              <div className="enterPin__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.MENU}>
                  <span className="enterPin__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={12} sm={12} className="enterPin__heading">
                  {t('menu:enterPin')}
                </Col>
              </Row>

              <Row className="pt-3 pl-sm-3">
                <Col md={6} sm={6} className="">
                  <div className="enterPin__subText">
                    {t('common:parentsOnly')}
                  </div>
                  <div className="enterPin__subTextDescription pt-1">
                    {t('menu:pinforSettings')}
                  </div>
                  <div className="enterPin__subLinks pt-3">
                    <Link to={ROUTER_URL_CONSTANT.FORGOT_PIN}>
                      {t('common:forGotPin')}
                    </Link>
                  </div>
                  <div className="enterPin__subLinks pt-2">
                    <Link to={ROUTER_URL_CONSTANT.RESET_PIN}>
                      {t('common:resetPin')}
                    </Link>
                  </div>
                </Col>
                <Col md={6} sm={6} className="pt-3">
                  <Row className="p-5">
                    <Col md={12}>
                      <Form.Group className="otp">
                        <div className="">
                          <div className="forgotpwd__otp-box">
                            <div className="forgotpwd__otp-box__opt-input">
                              <OtpInput
                                hasErrored
                                value={pin}
                                errorStyle={isPinError ? 'isInvalid' : ''}
                                isInputNum
                                onChange={handleOtpChange}
                                numInputs={4}
                                separator={<span> </span>}
                              />
                              {isPinError ? (
                                <div className="forgotpwd__otp-box__otp-error-msg">
                                  {t('menu:entervalidpin')}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>

                    <Col md={9} className="pt-3 ">
                      <Button
                        className="btn-pink float-right"
                        type="submit"
                        onClick={handleSubmitPin}
                      >
                        {t('menu:submit')}
                      </Button>
                    </Col>
                    <Col md={3}> </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
}
