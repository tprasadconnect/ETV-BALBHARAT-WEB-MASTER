import React, { useState } from 'react';
import { playIcon } from '../constants/iconImageConstant';
import { setClassName } from '../utils/commonFunctions';

interface ISimilarMovies {
  handleSimilarCardClick: (cardid: string) => void;
}
export const MoviesHScrollMenuItem = (props: any) => {
  const {
    index,
    length,
    imageUrl,
    title,
    subCatId,
    year,
    duration,
    handleCardClick,
  } = props;
  const [mouseHover, setMouseHover] = useState(false);

  const handleItemClick = (cardid) => {
    handleCardClick(cardid);
  };

  return (
    <div
      className={setClassName(index, length)}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      tabIndex={0}
      onKeyPress={() => {}}
      role="button"
      onClick={() => handleItemClick(subCatId)}
    >
      <img src={imageUrl} alt="feature show" className="hsvi__card-img" />
      {mouseHover && (
        <div className="hsvi__dark-gradient">
          <div className="hsvi__card-content">
            <div className="hsvi__card-playicon">
              <img src={playIcon} alt="play icon" />
            </div>
            <div className="hsvi__card-title">{title}</div>
            <div className="hsvi__card-info">
              <div className="hsvi__card-year">DISNEY | {year}</div>
              <div className="hsvi__card-duration">{duration} mins</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
