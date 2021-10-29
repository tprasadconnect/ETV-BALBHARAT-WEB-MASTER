import React, { useEffect, useState } from 'react';
import { Button, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes, selectors } from '../../store/profileBuilder';
import { getAvatar } from '../../services/profileBuilder/getAvatar';

export const YourAvatarStep: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('kidProfile');

  // selector
  const profileBuilderData = useSelector(selectors.getProfileBuilderData);
  const avatarList = useSelector(selectors.getAvatarList);

  // local state
  const [avatar, selectAvatar] = useState(0);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    dispatch(getAvatar());
  });

  // populate data for edit
  useEffect(() => {
    if (avatarList && avatarList.length > 0) {
      if (profileBuilderData.editProfile.kidid) {
        const index = avatarList.findIndex(
          (res) =>
            res.avatarImageUrl === profileBuilderData.editProfile.avatarimages
        );
        if (index !== -1) selectAvatar(index);
      }
    }
  }, [avatarList, profileBuilderData.editProfile]);

  const navigate = (tabIndex: number) => {
    dispatch({
      type: actionTypes.SET_TAB_INDEX,
      payload: tabIndex,
    });

    dispatch({
      type: actionTypes.ADD_NEW_PROFILE_BUILDER_DATA,
      payload: {
        data: {
          ...profileBuilderData.editProfile,
          avatarimages: avatarList[avatar].avatarImageUrl,
          avatarImageUrl: avatarList[avatar].avatarImageUrl,
        },
      },
    });
  };
  return (
    <div className="your-avatar">
      <div className="row justify-content-center">
        <Col
          md={2}
          xs={6}
          className="d-flex align-items-end order-2 order-md-1"
        >
          <Button className="btn-pink" onClick={() => navigate(1)}>
            {t('back')}
          </Button>
        </Col>
        <Col md={8} className="order-1 order-md-2">
          <div className="row your-avatar__avatar avatarScroll text-center ">
            {avatarList &&
              avatarList.map((res: any, index: number) => (
                <Col
                  onClick={() => selectAvatar(index)}
                  className="pb-4"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  md={4}
                  xs={6}
                >
                  <div
                    className={`avatar__big-avatar-90 cursor-pointer ${
                      avatar === index && 'active'
                    }`}
                  >
                    <Image
                      src={res.avatarImageUrl}
                      className="avatar__big-avatar-90__img"
                    />
                  </div>
                </Col>
              ))}
          </div>
        </Col>
        <Col
          md={2}
          xs={6}
          className="d-flex align-items-end order-3 order-md-3"
        >
          <Button className="btn-pink" onClick={() => navigate(3)}>
            {t('next')}
          </Button>
        </Col>
      </div>
    </div>
  );
};
