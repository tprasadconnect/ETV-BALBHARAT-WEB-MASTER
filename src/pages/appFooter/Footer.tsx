import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { socialLinks } from '../../services/socialLinks/socialLinks';
import { selectors } from '../../store/socialLinks';
import { policyNotes } from '../../services/policyNotes/policyNotes';
import { selectors as policySelectors } from '../../store/policyNotes';
import { selectors as lables } from '../../store/categoryMaster';

import {
  facebookFooterIcon,
  twitterIcon,
  youtubeIcon,
  FooterInstagram,
} from '../../constants/iconImageConstant';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const Footer = () => {
  const dispatch = useDispatch();
  const links = useSelector(selectors.getSocialLinksState);
  const policyData = links.data && links.data;
  const [footerDynamicLogo, setFooterDynamicLogo] = useState('');
  const [lableAboutUs, setLableAboutUs] = useState('');
  const [lablePrivacyPolicy, setLablePrivacyPolicy] = useState('');
  const [lableTerms, setLableTerms] = useState('');
  // const [lableTermsAndIps,] = useState('');
  // const [lableCookies,] = useState('');

  const languageData = useSelector(
    selectLanguageSelector.getSelectLanguageState
  );
  useEffect(() => {
    if (languageData.lang_image !== '' && languageData.lang_image !== null) {
      setFooterDynamicLogo(languageData.lang_image);
    }
  }, [languageData]);
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };

  useEffectOnMount(() => {
    if (userLanguageId) {
      const params = {
        languageid: userLanguageId,
      };
      const params2 = {
        languageid: userLanguageId, // no language Id for this api. for all languages we need to use english only
      };
      dispatch(socialLinks(params));
      dispatch(policyNotes(params2));
    }
  });
  const policyLinksData = useSelector(policySelectors.getPolicyNotesState);
  const policyHeadings = policyLinksData?.data;
  useEffect(() => {
    if (policyHeadings) {
      for (let i = 0; i < policyHeadings.length; i += 1) {
        if (policyHeadings[i].policy_id === '2') {
          setLableAboutUs(policyHeadings[i].policy_title);
        } else if (policyHeadings[i].policy_id === '3') {
          setLablePrivacyPolicy(policyHeadings[i].policy_title);
        } else if (policyHeadings[i].policy_id === '4') {
          setLableTerms(policyHeadings[i].policy_title);
        }
      }
    }
  }, [policyHeadings]);
  const labelData = useSelector(lables.getCatagoryMasterState);
  const labelDetails = labelData?.data;
  return (
    <>
      <div className="mainFooter">
        <footer>
          <div className="container">
            <div className="row no-gutters align-items-center socialIconsForWeb">
              <div className="col-1">
                <div className="imageBackground">
                  <img
                    src={footerDynamicLogo}
                    alt=""
                    className="webLogoFooter"
                  />
                </div>
              </div>
              <div className="col-8 text-center links">
                <a href={ROUTER_URL_CONSTANT.HOME}>
                  {' '}
                  {labelDetails?.label_details[0]?.Home}
                </a>
                <a href={ROUTER_URL_CONSTANT.TV_SHOWS}>
                  {labelDetails?.group_details?.[0]?.group_catg_name}
                </a>
                <a href={ROUTER_URL_CONSTANT.MOVIES}>
                  {labelDetails?.group_details?.[1]?.group_catg_name}
                </a>
                {/* <a href={ROUTER_URL_CONSTANT.MY_BB}>{t('footer:mybb')}</a>
                <a href={ROUTER_URL_CONSTANT.MY_BB_CLUB}>
                  {t('footer:bbclub')}
                </a> */}
                <a href={ROUTER_URL_CONSTANT.LANGUAGE_SELECTION}>
                  {labelDetails?.label_details[0]?.Language}
                </a>
              </div>
              <div className="col-3 text-right">
                <a
                  href={policyData && policyData[0].facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerSocialLinks"
                >
                  <img src={facebookFooterIcon} alt="facebook" />
                </a>
                <a
                  href={policyData && policyData[0].instragram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerSocialLinks"
                >
                  <img src={FooterInstagram} alt="instagram" />
                </a>
                <a
                  href={policyData && policyData[0].twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerSocialLinks"
                >
                  <img src={twitterIcon} alt="twitter" />
                </a>
                <a
                  href={policyData && policyData[0].youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footerSocialLinks"
                >
                  <img src={youtubeIcon} alt="youtube" />
                </a>
              </div>
            </div>
            <div className="socialIconsForMobiles">
              <div className="row align-items-center no-gutters">
                <div className="col-6">
                  <div className="imageBackground">
                    <img
                      src={footerDynamicLogo}
                      alt=""
                      className="webLogoFooter"
                    />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="row no-gutters">
                    <div className="col-3">
                      {' '}
                      <a
                        href={policyData && policyData[0].facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footerSocialLinks"
                      >
                        <img src={facebookFooterIcon} alt="facebook" />
                      </a>
                    </div>
                    <div className="col-3">
                      {' '}
                      <a
                        href={policyData && policyData[0].instragram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footerSocialLinks"
                      >
                        <img src={FooterInstagram} alt="instagram" />
                      </a>
                    </div>
                    <div className="col-3">
                      {' '}
                      <a
                        href={policyData && policyData[0].twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footerSocialLinks"
                      >
                        <img src={twitterIcon} alt="twitter" />
                      </a>
                    </div>
                    <div className="col-3">
                      {' '}
                      <a
                        href={policyData && policyData[0].youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footerSocialLinks"
                      >
                        <img src={youtubeIcon} alt="youtube" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.HOME}>
                    {labelDetails?.label_details[0]?.Home}
                  </a>
                </div>
                <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.TV_SHOWS}>
                    {labelDetails?.group_details?.[0]?.group_catg_name}
                  </a>
                </div>
                <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.MOVIES}>
                    {' '}
                    {labelDetails?.group_details?.[1]?.group_catg_name}
                  </a>
                </div>
                {/* <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.MY_BB}>{t('footer:mybb')}</a>
                </div>
                <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.MY_BB_CLUB}>
                    {t('footer:bbclub')}
                  </a>
                </div> */}
                <div className="col-6 links">
                  <a href={ROUTER_URL_CONSTANT.LANGUAGE_SELECTION}>
                    {labelDetails?.label_details[0]?.Language}
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <div className="row align-items-center">
              <div className="col-12 col-md-4">
                © All rights reserved - Etv Bal Bharat 2020
              </div>
              <div className="col-12 col-md-8 termsLinks">
                <div className="subFooter">
                  <div className="subText ">
                    {' '}
                    <a href={ROUTER_URL_CONSTANT.ABOUT_US}>{lableAboutUs}</a>
                  </div>
                  <div className="subText ">
                    <a href={ROUTER_URL_CONSTANT.PRIVACY_POLICY}>
                      {lablePrivacyPolicy}
                    </a>
                  </div>{' '}
                  <div className="subText ">
                    <a href={ROUTER_URL_CONSTANT.TERMS_AND_CONDITIONS}>
                      {lableTerms}
                    </a>
                  </div>
                  {/* <div className="subText ">
                    {' '}
                    <a href={ROUTER_URL_CONSTANT.COOKIE_POLICY}>{}</a>
                  </div>
                  <div className="subText ">
                    {' '}
                    <a href={ROUTER_URL_CONSTANT.TRADEMARKS_AND_IPS}>{}</a>
                  </div> */}
                  <div className="subText ">
                    {' '}
                    <a href={ROUTER_URL_CONSTANT.CHANNEL_SCHEDULE}>
                      {labelDetails?.label_details[0]?.ChannelSchedule}
                    </a>
                  </div>
                  <div className="subText ">
                    {' '}
                    <a href={ROUTER_URL_CONSTANT.CONTACTUS}>
                      {labelDetails?.label_details[0]?.ContactUs}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
