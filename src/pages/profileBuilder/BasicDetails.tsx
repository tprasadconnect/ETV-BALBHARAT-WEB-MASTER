/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import {
  femaleActiveIcon,
  maleActiveIcon,
  maleInActiveIcon,
  femaleInActiveIcon,
} from '../../constants/iconImageConstant';
import {
  checkError,
  getErrorMessage,
  years,
} from '../../utils/commonFunctions';
import { IBasicDetail, profileBasicSchema } from './validation';
import { actionTypes, selectors } from '../../store/profileBuilder';

export function BasicDetails() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['kidProfile']);
  // selector
  const profileBuilderData = useSelector(selectors.getProfileBuilderData);

  // local state
  const [gender, setGender] = useState('M');

  const { register, handleSubmit, errors, setValue } = useForm<IBasicDetail>({
    resolver: yupResolver(profileBasicSchema),
  });

  // populate data for edit
  const useEffectOnMountProfileBuilder = (effect: React.EffectCallback) => {
    useEffect(effect, [profileBuilderData.editProfile]);
  };
  useEffectOnMountProfileBuilder(() => {
    if (profileBuilderData.editProfile.kidid) {
      const monthYear: any = profileBuilderData.editProfile?.month_year;
      setValue('kidfirstname', profileBuilderData.editProfile?.kidfirstname);
      setValue('month', monthYear.split('-')[0]);
      setValue('year', monthYear.split('-')[1]);
      setGender(profileBuilderData.editProfile?.gender);
    }
  });

  const onSubmit = (data) => {
    dispatch({
      type: actionTypes.SET_TAB_INDEX,
      payload: 2,
    });
    if (profileBuilderData.editProfile.kidid) {
      dispatch({
        type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
        payload: {
          data: {
            ...profileBuilderData.editProfile,
            kidfirstname: data.kidfirstname,
            month_year: `${data.month}-${data.year}`,
            gender,
          },
        },
      });
    } else {
      dispatch({
        type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
        payload: {
          data: {
            kidfirstname: data.kidfirstname,
            month_year: `${data.month}-${data.year}`,
            gender,
          },
        },
      });
    }

    // history.push(ROUTER_URL_CONSTANT.YOUR_AVATAR_STEP);
  };

  return (
    <>
      <div className="row justify-content-center">
        <Col md={5}>
          <Form>
            <Form.Group>
              <Form.Label>
                {t('name')}
                <span>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="kidfirstname"
                ref={register}
                className={`form-control ${checkError(errors, 'kidfirstname')}`}
              />
              {getErrorMessage(errors, 'kidfirstname', t)}
            </Form.Group>
            <div className="profile-builder__birth-details">
              <Form.Label>
                {t('birthDetails')}
                <span>*</span>
              </Form.Label>
              <div className="row">
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="month"
                      ref={register}
                      className={`form-control ${checkError(
                        errors,
                        'month'
                      )} select`}
                      id="exampleFormControlSelect1"
                    >
                      <option value="">{t('month')}</option>
                      <option value="1">{t('january')}</option>
                      <option value="2">{t('february')}</option>
                      <option value="3">{t('march')}</option>
                      <option value="4">{t('april')}</option>
                      <option value="5">{t('may')}</option>
                      <option value="6">{t('june')}</option>
                      <option value="7">{t('july')}</option>
                      <option value="8">{t('august')}</option>
                      <option value="9">{t('september')}</option>
                      <option value="10">{t('october')}</option>
                      <option value="11">{t('november')}</option>
                      <option value="12">{t('december')}</option>
                    </Form.Control>
                    {getErrorMessage(errors, 'month', t)}
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="year"
                      ref={register}
                      className={`form-control ${checkError(
                        errors,
                        'year'
                      )} select`}
                      id="exampleFormControlSelect1"
                    >
                      <option value="">{t('year')}</option>
                      {years.map((x) => {
                        return (
                          <option value={x} key={`year${x}`}>
                            {x}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {getErrorMessage(errors, 'year', t)}
                  </Form.Group>
                </div>
              </div>
            </div>
          </Form>
        </Col>
        <Col md={1} />
        <Col md={5} className="text-left">
          <Form.Label>
            {t('selectGender')}r<span>*</span>
          </Form.Label>
          <div className="pt-3">
            <div className="basic-Details__gender">
              <span
                onClick={() => setGender('M')}
                className={`basic-Details__gender__e-gender cursor-pointer ${
                  gender === 'M' && 'active'
                }`}
              >
                <Image
                  src={gender === 'M' ? maleActiveIcon : maleInActiveIcon}
                />
              </span>
              <span
                onClick={() => setGender('F')}
                className={`basic-Details__gender__e-gender cursor-pointer ${
                  gender === 'F' && 'active'
                }`}
              >
                <Image
                  src={gender === 'F' ? femaleActiveIcon : femaleInActiveIcon}
                />
              </span>
            </div>
          </div>
        </Col>
      </div>
      <div className="text-right">
        <Button
          type="submit"
          className="btn-pink"
          onClick={handleSubmit(onSubmit)}
        >
          {t('next')}
        </Button>
      </div>
    </>
  );
}
