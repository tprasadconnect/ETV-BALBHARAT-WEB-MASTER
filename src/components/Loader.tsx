import React from 'react';
// import { Spinner } from 'react-bootstrap';
import ReactBodymovin from 'react-bodymovin';
import animation from '../assets/loader.json';

export const Loader = () => {
  const bodymovinOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: animation,
  };

  return (
    <div className="loader-container">
      <ReactBodymovin options={bodymovinOptions}>
        <span className="sr-only">Loading...</span>
      </ReactBodymovin>
    </div>
  );
};
