/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { usePlayer } from '../hooks/usePlayer';

interface IPlayer {
  style?: any;
  videoUrl: string;
  bannerUrl: string;
  autoPlayVideo: boolean;
  watchedDuration: number;
  handleTimeUpdate: (currentTime: number) => void;
  handleOnPause: (currentTime?: number) => void;
}

export const Player: React.FC<IPlayer> = ({
  style,
  videoUrl,
  bannerUrl,
  autoPlayVideo,
  watchedDuration,
  handleTimeUpdate,
  handleOnPause,
}: IPlayer) => {
  const onPlay = (currentTime?: number) => {
    // eslint-disable-next-line no-console
    console.log('Video played at: ', currentTime);
  };

  const onPause = (currentTime?: number) => {
    // eslint-disable-next-line no-console
    console.log('Video paused at: ', currentTime);
    handleOnPause(currentTime);
  };

  const onEnd = (currentTime?: number) => {
    // eslint-disable-next-line no-console
    console.log(`Video ended at ${currentTime}`);
  };

  const onTimeUpdate = (currentTime: number) => {
    // eslint-disable-next-line no-console
    console.log(`Video current time is ${currentTime}`);
    handleTimeUpdate(currentTime);
  };

  const { vjsId, vjsRef, vjsClassName } = usePlayer({
    src: videoUrl,
    poster: bannerUrl,
    controls: true,
    bigPlayButton: true,
    responsive: true,
    fill: true,
    bigPlayButtonCentered: true,
    watchedDuration,
    onPlay,
    onPause,
    onEnd,
    onTimeUpdate,
  });

  return (
    <Container>
      <Row>
        <Col>
          <div className="player">
            <div className="player__player-container" style={style}>
              <div data-vjs-player>
                <video
                  ref={vjsRef}
                  id={vjsId}
                  className={vjsClassName}
                  autoPlay={autoPlayVideo}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
