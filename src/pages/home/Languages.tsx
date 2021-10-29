/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { languages } from '../../services/languages/getLanguages';
import { selectors } from '../../store/languages';
import { HorizontalScroll } from '../../components/HorizontalScroll';
import { getRandomColor } from '../../utils/commonFunctions';
import { languageAvatarIcon } from '../../constants/iconImageConstant';
import { Loader } from '../../components/Loader';

export function Languages() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['home']);

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

  const MenuItem = (props: any) => {
    const { langTitle, langEn, key } = props;
    return (
      <Card
        id={key}
        className="languages__lang-card"
        style={{ background: getRandomColor() }}
      >
        <Card.Body>
          <Card.Title className="languages__lang-card__title">
            {langTitle}
          </Card.Title>
          <Card.Text className="mb-2 languages__lang-card__sub-title pt-3">
            {langEn}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const Menu = (list: any) =>
    list.map((el: any) => {
      const { lang_name, lang_name_en } = el;
      return (
        <MenuItem langTitle={lang_name} langEn={lang_name_en} key={lang_name} />
      );
    });

  const menu = languagesList && Menu(languagesList);

  return (
    <>
      <div className="languages d-none d-sm-block">
        <div className="languages__HL-text1">{t('languages')}</div>
        <img
          src={languageAvatarIcon}
          className="languages__HL-img1"
          alt="language icon"
        />
        <div className="languages__title">{t('languages')}</div>
        {languagesList && <HorizontalScroll menu={menu} />}
        {showLoader && <Loader />}
      </div>
    </>
  );
}
