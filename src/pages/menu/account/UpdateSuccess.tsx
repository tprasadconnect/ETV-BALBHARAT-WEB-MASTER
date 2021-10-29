import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { successMessageIcon } from '../../../constants/iconImageConstant';

export function UpdateSuccess(props: any) {
  const { title, subTitle, btnName, routeTo } = props;
  return (
    <div className="edit-account__container">
      <div className="text-center">
        <div className="p-4">
          <Image src={successMessageIcon} />
        </div>
        <div className="edit-account__title-24">{title}</div>
        <div className="edit-account__sub-title-14 pt-3">{subTitle}</div>
        <div className="p-4">
          <Button className="btn-pink">
            <Link to={routeTo}>
              <span className="edit-account__white-text">{btnName}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
