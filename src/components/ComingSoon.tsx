import React from 'react';
import { useHistory } from 'react-router-dom';
import { comingSoon } from '../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';

export function ComingSoon() {
  const history = useHistory();
  const Home = () => {
    history.push(ROUTER_URL_CONSTANT.HOME);
  };
  return (
    <div className="comingSoon">
      <img
        src={comingSoon}
        alt=""
        className="img-fluid"
        aria-hidden="true"
        onClick={Home}
      />
    </div>
  );
}
