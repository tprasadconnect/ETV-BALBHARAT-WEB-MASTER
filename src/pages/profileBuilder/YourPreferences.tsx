import React, { useEffect, useState } from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectPosterIcon } from '../../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { getPreferencesList } from '../../services/profileBuilder/getPreferences';
import { setKidRegistration } from '../../services/profileBuilder/setKidRegistration';
import { updateKidRegistration } from '../../services/profileBuilder/updateKidRegistration';
import { selectors, actionTypes } from '../../store/profileBuilder';
import { selectors as userStoreSelectors } from '../../store/userStore';

export function YourPreferencesStep() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation('kidProfile');

  const [passId, setPassId] = React.useState('');
  const [preferencesError, setPreferencesError] = React.useState('');

  const useEffectOnMountPreference = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMountPreference(() => {
    if (history.location.pathname.includes('kid')) {
      const id = history.location.pathname.substring(
        history.location.pathname.lastIndexOf('/') + 1
      );
      setPassId(id);
    }
  });

  // selector
  const profileBuilderData = useSelector(selectors.getProfileBuilderData);
  const preferencesList = useSelector(selectors.getPreferencesList);
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  // local state
  const [posterList, setPoster] = useState(
    JSON.parse(JSON.stringify(preferencesList))
  );

  const selectPoster = (index) => {
    setPreferencesError('');
    posterList[index].isSelect = !posterList[index].isSelect;
    setPoster(JSON.parse(JSON.stringify(posterList)));
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(getPreferencesList());
  });

  useEffect(() => {
    if (preferencesList.length > 0) {
      if (profileBuilderData.editProfile.categorypreferences) {
        preferencesList.map((res: any) => {
          if (
            profileBuilderData.editProfile.categorypreferences
              .split(',')
              .includes(res.preferenceId.toString())
          ) {
            res.isSelect = true;
          }
          return res;
        });
      }
      setPoster(JSON.parse(JSON.stringify(preferencesList)));
    }
  }, [preferencesList, profileBuilderData.editProfile]);

  const navigate = (page: any, index: number) => {
    let isAtleasetOnePreferencesSelected = false;
    posterList.forEach((data) => {
      if (data.isSelect && data.isSelect === true) {
        isAtleasetOnePreferencesSelected = true;
      }
    });
    if (isAtleasetOnePreferencesSelected) {
      if (index) {
        dispatch({
          type: actionTypes.SET_TAB_INDEX,
          payload: index,
        });
      } else if (profileBuilderData.editProfile.kidid) {
        // edit api call
        const data = {
          ...profileBuilderData.editProfile,
          categorypreferences: posterList
            .map((res) => res.isSelect && res.preferenceId)
            .filter(Boolean)
            .toString(),
          userid: userStoreState.data.userid,
        };
        dispatch(updateKidRegistration(data));
        dispatch({
          type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
          payload: {
            data,
          },
        });
      } else {
        const data = {
          ...profileBuilderData.editProfile,
          categorypreferences: posterList
            .map((res) => res.isSelect && res.preferenceId)
            .filter(Boolean)
            .toString(),
          userid: userStoreState.data.userid,
        };
        dispatch(setKidRegistration(data));
        dispatch({
          type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
          payload: {
            data,
          },
        });
      }
      if (page) {
        if (history.location.pathname.includes('kid')) {
          if (history.location.search)
            history.push({
              pathname: `${page}/kid/${passId}`,
              search: 'switchprofile',
            });
          else history.push(`${page}/kid/${passId}`);
        } else if (history.location.pathname.includes('addkid')) {
          history.push(`${page}/addkid`);
        } else {
          history.push(page);
        }
      }
    } else {
      setPreferencesError(t('selectAtleastOnePreference'));
    }
  };

  return (
    <div className="your-Preferences">
      <div className="row justify-content-center">
        <Col
          md={2}
          xs={6}
          className="d-flex align-items-end order-2 order-md-1"
        >
          <Button className="btn-pink" onClick={() => navigate(null, 2)}>
            {t('back')}
          </Button>
        </Col>
        <Col md={8} className="order-1 order-md-2">
          <div className="row your-Preferences__poster text-center">
            {posterList.map((res: any, index: number) => (
              <Col
                onClick={() => selectPoster(index)}
                key={res.preferenceId}
                md={4}
                xs={6}
              >
                <div
                  className={`your-Preferences__poster__poster-image ${
                    res.isSelect && 'active'
                  }`}
                >
                  {res.isSelect && (
                    <span className="your-Preferences__poster__poster-image__poster-select">
                      <Image src={selectPosterIcon} />
                    </span>
                  )}
                  <Image src={res.preferenceImageUrl} />
                </div>
                <div className="your-Preferences__poster__poster-name">
                  {res.preferenceName}
                </div>
              </Col>
            ))}
            {preferencesError && (
              <span className="your-Preferences__select-preference-error">
                {preferencesError}
              </span>
            )}
          </div>
        </Col>
        <Col
          md={2}
          xs={6}
          className="d-flex align-items-end order-3 order-md-3"
        >
          <Button
            className="btn-pink"
            onClick={() => navigate(ROUTER_URL_CONSTANT.PROFILE_DETAILS, 0)}
          >
            {t('next')}
          </Button>
        </Col>
      </div>
    </div>
  );
}
