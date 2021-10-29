import React, { useState } from 'react';
import { setClassName } from '../utils/commonFunctions';

export const ShowsHScrollMenuItem = (props: any) => {
  const {
    index,
    length,
    imageUrl,
    subCatId,
    title,
    seasonDetails,
    catgId,
    episodeId,
    onCardClick,
  } = props;
  const [mouseHover, setMouseHover] = useState(false);

  const handleCardClick = (
    id: string,
    seasonsDetails: any,
    epiId: string,
    catGid?: string
  ) => {
    if (catGid) onCardClick(id, seasonsDetails, epiId, catGid);
    else onCardClick(id, seasonsDetails);
  };

  const getSeasonsDetails = (seasons) => {
    const totalNoOfSeasons = seasons.length;
    let totalNoOfEpisodes = 0;
    seasons.forEach((data) => {
      const ep = data.episodes.split('-');
      totalNoOfEpisodes += parseInt(ep[1], 10);
    });
    return `${totalNoOfSeasons} SEASONS | ${totalNoOfEpisodes} EPISODES`;
  };

  return (
    <div
      className={setClassName(index, length)}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      tabIndex={0}
      onKeyPress={() => {}}
      role="button"
      onClick={() =>
        handleCardClick(subCatId, seasonDetails, catgId, episodeId)
      }
    >
      <img src={imageUrl} alt="feature show" className="hsvi__card-img" />
      {mouseHover && (
        <div className="hsvi__dark-gradient">
          <div className="hsvi__card-content">
            <div className="hsvi__card-title">{title}</div>
            <div className="hsvi__tvshow-info">
              {getSeasonsDetails(seasonDetails)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
