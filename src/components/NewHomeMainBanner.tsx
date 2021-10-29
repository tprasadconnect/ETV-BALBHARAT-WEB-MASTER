import React from 'react';
import { Image } from 'react-bootstrap';

import { apiBannerImage } from '../constants/iconImageConstant';

export function NewHomeMainBanner() {
  return (
    <div className="homeBanner">
      <div className="row no-gutters">
        <div className="col-1" />
        <div className="col-10 text-center">
          <Image src={apiBannerImage} />
        </div>
        <div className="col-1" />
      </div>
    </div>
  );
}
