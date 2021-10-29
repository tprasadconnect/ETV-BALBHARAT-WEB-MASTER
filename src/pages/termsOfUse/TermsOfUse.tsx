import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import { policyNotes } from '../../services/policyNotes/policyNotes';
import { selectors } from '../../store/policyNotes';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const TermsOfUse: React.FC = () => {
  const dispatch = useDispatch();
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );
  const [terms, setTerms] = useState({ policy_description: '' });
  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMountCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });
  const getSectionPlicyNotesState = useSelector(selectors.getPolicyNotesState);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  const useEffectOnTerms = (effect: React.EffectCallback) => {
    React.useEffect(effect, [getSectionPlicyNotesState]);
  };
  useEffectOnTerms(() => {
    for (let i = 0; i < getSectionPlicyNotesState?.data?.length; i += 1) {
      if (getSectionPlicyNotesState?.data?.[i]?.policy_id === '4') {
        setTerms(getSectionPlicyNotesState?.data?.[i]);
      }
    }
  });
  useEffectOnMount(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
    };
    dispatch(policyNotes(params));
  });
  return (
    <div className="termsOfUse">
      <Header />
      <div className="container linksContent">
        {terms && (
          /* eslint-disable react/no-danger */
          <div dangerouslySetInnerHTML={{ __html: terms.policy_description }} />
        )}
      </div>
      <Footer />
    </div>
  );
};
