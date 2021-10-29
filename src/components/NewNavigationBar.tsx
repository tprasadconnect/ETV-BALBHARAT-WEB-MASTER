import React from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  newHomePageGirlPic,
  newHomePageHTvShows,
  newHomePageMovies,
  newHomePageMyBb,
  newHomePageSearch,
  newHomeLogo,
  newHomeLoginIcon,
} from '../constants/iconImageConstant';

import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';

export function NewNavigationBar() {
  return (
    <div className="homeNavigation">
      <Image src={newHomePageGirlPic} className="hiGirlPic" />
      <div className="row">
        <div className="col-2" />
        <div className="col-8 d-flex justify-content-center text-center">
          <ul className="d-flex">
            <li>
              <NavLink activeClassName="logo" to={ROUTER_URL_CONSTANT.TV_SHOWS}>
                <Image height="30px" width="30px" src={newHomePageHTvShows} />
                <span className="pt-2">TV Shows</span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="logo" to={ROUTER_URL_CONSTANT.MOVIES}>
                <Image height="30px" width="30px" src={newHomePageMovies} />
                <span className="pt-2">Movies</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="pt-0"
                activeClassName="logo"
                to={ROUTER_URL_CONSTANT.HOME}
              >
                <Image src={newHomeLogo} />
              </NavLink>
            </li>
            <li>
              <a href="/">
                <Image height="30px" width="30px" src={newHomePageMyBb} />
                <span className="pt-2">My BB</span>
              </a>
            </li>
            <li>
              <a href="/">
                <Image height="30px" width="30px" src={newHomePageSearch} />
                <span className="pt-2">Search</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-2 d-flex justify-content-end loginButton">
          <a href="/">
            <Image src={newHomeLoginIcon} />
          </a>
        </div>
      </div>
    </div>
  );
}
