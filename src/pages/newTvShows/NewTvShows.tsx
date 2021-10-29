import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../appFooter/Footer';
import { NewToonsThumbNail } from '../../components/NewToonsThumbNail';
import { ViewDetails } from '../../components/ViewDetails';
import { NewMainCarousel } from '../../components/NewMainCarousel';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { Header } from '../Header/Header';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectors, actionTypes } from '../../store/categoryMaster';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { toons } from '../../services/toons/toons';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const NewTVShows: React.FC = () => {
  const dispatch = useDispatch();
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );
  const useEffectOnCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });
  const useEffectOnToons = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnToons(() => {
    const params = { languageid: 1 };
    dispatch(toons(params));
  });
  const [allTvShow, setallTvShow] = useState([] as any);
  const [tvShows, setTvShows] = useState([] as any);
  const [currentList, setCurrentList] = useState(8);
  const [isDataExisted, setIsDataExisted] = useState(true);
  const catgMasterState = useSelector(selectors.getCatagoryMasterState);
  const categoryMastersShowsList =
    catgMasterState?.data?.group_details?.[0]?.maincategory_details || [];

  useEffect(() => {
    let originals = categoryMastersShowsList?.[0]?.subcategory_details || [];
    originals = originals.map((original) => {
      return {
        ...original,
        subId: categoryMastersShowsList?.[0]?.catg_id,
        grpId: catgMasterState?.data?.group_details?.[0]?.group_catg_id,
      };
    });

    let globals = categoryMastersShowsList?.[1]?.subcategory_details || [];
    globals = globals.map((global) => {
      return {
        ...global,
        subId: categoryMastersShowsList?.[1]?.catg_id,
        grpId: catgMasterState?.data?.group_details?.[0]?.group_catg_id,
      };
    });

    globals = [...originals, ...globals];
    globals.sort((a, b) => a.sub_catg_id - b.sub_catg_id);

    if (globals.length > 0) {
      setallTvShow(globals);
      setTvShows(globals.slice(0, currentList));
    }
    // eslint-disable-next-line
  }, [catgMasterState]);
  const loadMoreData = () => {
    const currentListLength = currentList + 8;
    setTvShows(allTvShow.slice(0, currentListLength));
    setCurrentList(currentListLength);
    if (allTvShow.length < currentListLength) {
      setIsDataExisted(false);
    }
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: actionTypes.CATEGORY_MASTER_SUCCESS_ACTION,
        payload: { data: null },
      });
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="homeLandingPage">
        <Header />

        <div className="carouselContent">
          <NewMainCarousel
            groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS}
          />
        </div>
        <NewToonsThumbNail />
        <ViewDetails
          data={categoryMastersShowsList?.[0]?.subcategory_details}
          title={categoryMastersShowsList?.[0]?.catg_name}
          backgroundClass="peachBG afterblueLTRB"
          forIndivudualClass="peachBG"
          isVewAll
          redirectUrl={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
          contentType="originals"
          subCategoryID={categoryMastersShowsList?.[0]?.catg_id}
          playType="shows"
          subDivision="originals"
          groupCatgId={catgMasterState?.data?.group_details?.[0]?.group_catg_id}
        />
        <ViewDetails
          data={categoryMastersShowsList?.[1]?.subcategory_details}
          title={categoryMastersShowsList?.[1]?.catg_name}
          backgroundClass="blueBG afterpinkLBRT"
          forIndivudualClass="blueBG"
          isVewAll
          redirectUrl={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
          contentType="globals"
          subCategoryID={categoryMastersShowsList?.[1]?.catg_id}
          playType="shows"
          subDivision="globals"
          groupCatgId={catgMasterState?.data?.group_details?.[0]?.group_catg_id}
        />
        <ViewDetails
          data={tvShows}
          title="All Shows"
          backgroundClass="pinkBG"
          forIndivudualClass="pinkBG"
          apiCall={() => loadMoreData()}
          redirectUrl={ROUTER_URL_CONSTANT.LIST_OF_ITEMS}
          contentType="allShows"
          playType="shows"
          loadMore
          listAllItems="yes"
          isMoreData={isDataExisted}
        />
        <Footer />
      </div>
    </>
  );
};
