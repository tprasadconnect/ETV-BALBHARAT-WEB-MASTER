import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { policyNotes } from '../../services/policyNotes/policyNotes';
import { selectors } from '../../store/policyNotes';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const CookiePolicy: React.FC = () => {
  const dispatch = useDispatch();

  const getSectionPlicyNotesState = useSelector(selectors.getPolicyNotesState);
  const policyData =
    getSectionPlicyNotesState.data &&
    getSectionPlicyNotesState.data[4] &&
    getSectionPlicyNotesState.data[4];
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMount(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
    };
    dispatch(policyNotes(params));
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
    <div className="cookiePolicy">
      <Header />

      <div className="container linksContent">
        {policyData && (
          /* eslint-disable react/no-danger */
          <div
            dangerouslySetInnerHTML={{ __html: policyData.policy_description }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};
