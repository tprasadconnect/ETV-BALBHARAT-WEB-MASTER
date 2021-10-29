import React from 'react';
import { Player } from '../../components/Player';
import { mainVTImg } from '../../constants/iconImageConstant';

export const TestPage: React.FC = () => {
  const bookmarkTime = 0;
  let currentTimeFloorValue = 0;
  const onTimeUpdate = (currentTime: number) => {
    if (currentTimeFloorValue === Math.floor(currentTime))
      currentTimeFloorValue = Math.floor(currentTime);
  };
  const onPause = () => {};
  return (
    <Player
      style={{ height: '310px' }}
      videoUrl="https://d1gufiqe0aaw45.cloudfront.net/multilingual_output/BB_SM_S1_EP1_SEG2.m3u8"
      bannerUrl={mainVTImg}
      watchedDuration={bookmarkTime}
      autoPlayVideo={false}
      handleTimeUpdate={onTimeUpdate}
      handleOnPause={onPause}
    />
  );
};
