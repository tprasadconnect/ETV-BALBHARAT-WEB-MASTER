import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as userStoreSelectors } from '../../store/userStore';
import {
  favouriteIcon,
  favouriteSelect,
} from '../../constants/iconImageConstant';

export const EpisodesComponent = (data) => {
  const { t } = useTranslation(['common', 'playerDetails']);
  const {
    isActive,
    contentId,
    epiImg,
    episode,
    epiTitle,
    season,
    year,
    genre,
    epiDescription,
    isFavourite,
    handleEpisodeClick,
    handleEpiFav,
  } = data;

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;

  const [mouseHover, isMouseHover] = useState(false);

  return (
    <div
      className={`detailsPageSections__Shows-View__SV-Slist ${
        isActive && 'active'
      }`}
      key={contentId}
      onMouseEnter={() => isMouseHover(true)}
      onMouseLeave={() => isMouseHover(false)}
    >
      <div className="row">
        <div className="col-10">
          <div
            className="row"
            onClick={() => handleEpisodeClick(season, contentId)}
            tabIndex={0}
            role="button"
            onKeyPress={() => {}}
          >
            <div className="col-4">
              <div className="detailsPageSections__Shows-View__SV-Slist__SVS-img-container">
                <img
                  src={epiImg}
                  alt="episode pic"
                  className="detailsPageSections__Shows-View__SV-Slist__SVS-img img-fluid"
                />
              </div>
            </div>
            <div className="col-8">
              <div className="detailsPageSections__Shows-View__SV-Slist__SV-text2">
                {t('playerDetails:episode')} {episode}{' '}
                <span className="Shows-View__SV-Slist__SV-text2__dot" />{' '}
                {t('common:english')}
              </div>
              <h4 className="detailsPageSections__Shows-View__SV-Slist__show-name">
                {epiTitle}
              </h4>
              <div className="detailsPageSections__Shows-View__SV-Slist__SV-text3">
                {t('playerDetails:s')} {season}{' '}
                <span className="detailsPageSections__Shows-View__SV-Slist__dot" />{' '}
                {t('playerDetails:ep')} {episode}{' '}
                <span className="detailsPageSections__Shows-View__SV-Slist__dot" />{' '}
                {t('common:english')}
              </div>
              <div className="detailsPageSections__Shows-View__SV-Slist__Ep-year">
                {year}
              </div>
              <div className="detailsPageSections__Shows-View__SV-Slist__SV-text1">
                {genre}
              </div>
              <div className="detailsPageSections__Shows-View__SV-Slist__SV-desc">
                <div
                  className="detailsPageSections__Shows-View__SV-Slist__epi_desc"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: epiDescription,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <>
            {userid && (mouseHover || isActive) && (
              <span
                className="detailsPageSections__Shows-View__SV-Slist__fav"
                onClick={() => handleEpiFav(contentId, isFavourite, isActive)}
                tabIndex={0}
                role="button"
                onKeyPress={() => {}}
                key={contentId}
              >
                <img
                  src={isFavourite ? favouriteSelect : favouriteIcon}
                  alt="favourite icon"
                />
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
