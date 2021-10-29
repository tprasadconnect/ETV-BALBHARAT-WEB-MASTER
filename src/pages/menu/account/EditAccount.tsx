import React, { useState } from 'react';
import { Col, Row, Image, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {
  backIcon,
  parentBigAvatarIcon,
} from '../../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { ModalWindow } from '../../../components/ModalWindow';
import {
  numberOnly,
  checkError,
  getErrorMessage,
} from '../../../utils/commonFunctions';
import { editParentProfileSchema } from './validation';
import { parentProfileUpdate } from '../../../services/parentProfile/parentProfileUpdate';
import { parentProfile } from '../../../services/parentProfile/parentProfile';
import { selectors as parentProfileSelectors } from '../../../store/parentProfile';
import {
  actionTypes as parentProfileUpdateActionTypes,
  selectors as parentProfileUpdateSelectors,
} from '../../../store/parentProfileUpdate';
import { UpdateSuccess } from './UpdateSuccess';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { Toaster } from '../../../components/Toaster';
import { Loader } from '../../../components/Loader';

interface IEditAccountFormInputs {
  firstname: string;
  lastname: string;
  contactno: string;
  email: string;
}

export function EditAccount() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContactno] = useState('');
  const [formDataFname, setFormDataFName] = useState('');
  const [accountUpdate, setAccountUpdate] = useState(false);
  const [userid, setUserid] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ type: '', description: '' });

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const useEffectOnMountGetParentProfile = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userStoreState]);
  };
  useEffectOnMountGetParentProfile(() => {
    if (userStoreState.data) {
      setUserid(userStoreState.data.userid);
      dispatch(parentProfile({ userid: userStoreState.data.userid }));
    }
    setShowLoader(userStoreState.loader);
  });

  const parentProfileState = useSelector(
    parentProfileSelectors.getParentProfileState
  );
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [parentProfileState]);
  };
  useEffectOnMount(() => {
    if (parentProfileState.data) {
      setName(parentProfileState.data.firstname);
      setEmail(parentProfileState.data.email);
      setContactno(parentProfileState.data.contactno);
    }
    setShowLoader(parentProfileState.loader);
  });

  const parentProfileUpdateState = useSelector(
    parentProfileUpdateSelectors.getParentProfileUpdateState
  );
  const useEffectOnMountParentProfileUpdate = (
    effect: React.EffectCallback
  ) => {
    React.useEffect(effect, [parentProfileUpdateState]);
  };
  useEffectOnMountParentProfileUpdate(() => {
    if (parentProfileUpdateState.data) {
      setAccountUpdate(true);
      dispatch({
        type:
          parentProfileUpdateActionTypes.PARENT_PROFILE_UPDATE_SUCCESS_ACTION,
        payload: { data: null },
      });
    }
    if (parentProfileUpdateState.error) {
      setShowToast(true);
      setToastInfo({
        ...toastInfo,
        type: 'error',
        description: parentProfileUpdateState.error.errorDescription,
      });
      dispatch({
        type:
          parentProfileUpdateActionTypes.PARENT_PROFILE_UPDATE_FAILURE_ACTION,
        payload: { error: null },
      });
    }
    setShowLoader(parentProfileUpdateState.loader);
  });

  const { register, handleSubmit, errors } = useForm<IEditAccountFormInputs>({
    resolver: yupResolver(editParentProfileSchema),
  });

  const onSubmit = (data: any) => {
    setFormDataFName(data.firstname);
    setShowModal(true);
  };

  const handleConfirmUpdate = () => {
    dispatch({
      type: parentProfileUpdateActionTypes.PARENT_PROFILE_UPDATE_FAILURE_ACTION,
      payload: { error: null },
    });
    const params = {
      userid,
      firstname: formDataFname,
      lastname: '',
      profilephoto: '',
    };
    dispatch(parentProfileUpdate(params));
    setShowModal(false);
  };

  const handleEditMobile = () => {
    history.push(ROUTER_URL_CONSTANT.UPDATE_MOBILE);
  };

  return (
    <div className="edit-account main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={2} xs={6} className="d-none d-lg-block" />
          <Col md={8}>
            {!accountUpdate ? (
              <div className="edit-account__container">
                <div className="edit-account__back-btn pl-sm-3 pb-3">
                  <div>
                    <Image src={backIcon} />
                  </div>
                  <Link to={ROUTER_URL_CONSTANT.ACCOUNT}>
                    <span className="edit-account__back-btn__back-text">
                      Back
                    </span>
                  </Link>
                </div>
                <Row className="pt-3 pl-sm-3">
                  <Col md={5}>
                    <div className="edit-account__title">Edit Account</div>
                    <div className="pt-4">
                      <div className="avatar__big-avatar-120">
                        <Image
                          src={parentBigAvatarIcon}
                          className="avatar__big-avatar-120__img"
                        />
                      </div>
                    </div>
                    <div className="pt-3">
                      <div className="avatar__big-avatar-120__name">{name}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="edit-account__title">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                          <Form.Label>NAME*</Form.Label>
                          <div
                            className="edit-account__update"
                            aria-hidden="true"
                          >
                            <Button
                              className="edit-account__btn-transparent"
                              type="submit"
                            >
                              Update
                            </Button>
                          </div>
                          <Form.Control
                            type="text"
                            name="firstname"
                            ref={register}
                            defaultValue={name}
                            className={`form-control ${checkError(
                              errors,
                              'firstname'
                            )}`}
                          />
                          {getErrorMessage(errors, 'firstname')}
                        </Form.Group>
                      </Form>
                      <Form.Group>
                        <Form.Label>REGISTERED EMAIL ID</Form.Label>
                        <Form.Control
                          readOnly
                          type="email"
                          name="email"
                          ref={register}
                          defaultValue={email}
                          className={`form-control ${checkError(
                            errors,
                            'email'
                          )}`}
                        />
                        {getErrorMessage(errors, 'email')}
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          MOBILE NUMBER<span>*</span>
                        </Form.Label>
                        <div className="mobile-prefix__mobilePrefix">+91</div>
                        <div
                          className="edit-account__update"
                          aria-hidden="true"
                        >
                          <Button
                            className="edit-account__btn-transparent"
                            onClick={handleEditMobile}
                          >
                            Update
                          </Button>
                        </div>
                        <Form.Control
                          readOnly
                          type="text"
                          name="contactno"
                          onKeyPress={numberOnly}
                          maxLength={10}
                          ref={register}
                          defaultValue={contactno}
                          className={`form-control mobile-prefix__pl-45 ${checkError(
                            errors,
                            'contactno'
                          )}`}
                        />
                        {getErrorMessage(errors, 'contactno')}
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <UpdateSuccess
                title="Updated Successfull"
                subTitle="You have successfully updated your details."
                btnName="OKAY"
                routeTo={ROUTER_URL_CONSTANT.ACCOUNT}
              />
            )}
          </Col>
          <Col md={2} />
        </Row>
      </div>
      <ModalWindow
        show={showModal}
        onHide={() => setShowModal(false)}
        handleSubmit={handleConfirmUpdate}
        modalTitle="Account"
        modalDescription="Are you sure you want to update changes ?"
      />
      <Toaster
        show={showToast}
        toastInfo={toastInfo}
        handleCloseToast={() => setShowToast(false)}
      />
      {showLoader && <Loader />}
    </div>
  );
}
