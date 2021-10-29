import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';
import { HorizontalScroll } from './HorizontalScroll';
import { selectors } from '../store/toons';

export const NewToonsThumbNail: React.FC = () => {
  const history = useHistory();
  // const { data } = props;
  const toonsState = useSelector(selectors.getToonsState);

  const Menu = (list: any) => {
    if (list) {
      return list?.map((el: any) => {
        return (
          <div
            onClick={() => {
              history.push(
                `${ROUTER_URL_CONSTANT.TOONS_DETAIL}/${el.group_catg_id}/${el.catg_id}/${el.sub_catg_id}`
              );
            }}
            key={el.toon_id}
            className="toonsLink px-3 "
            aria-hidden="true"
          >
            <Image src={el.toon_image} className="toonsTransForm" />
          </div>
        );
      });
    }
    return <></>;
  };
  const toonsListItem = Menu(toonsState?.data?.toons_details || []);

  const [toonlist, settoonlist] = useState([]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [toonsState?.data]);
  };
  useEffectOnMount(() => {
    settoonlist(toonsListItem);
  });

  return (
    <div className="toonsBanner">
      <div className=" no-gutters align-items-center">
        <HorizontalScroll menu={toonlist} />
      </div>
    </div>
  );
};
