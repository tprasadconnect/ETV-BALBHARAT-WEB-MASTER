import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Footer } from '../appFooter/Footer';
import { Header } from '../Header/Header';
import { NewMainCarousel } from '../../components/NewMainCarousel';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ViewDetails } from '../../components/ViewDetails';
import { subCategory } from '../../services/subCategory/subCategory';
import { selectors, actionTypes } from '../../store/subCategory';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
// import { selectLanguageSelector } from '../../store/selectLanguage';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const NewListItems: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const urlParamsList = history.location.pathname.split('/');
  const [offsetValue, setOffsetValue] = useState(0);
  const [itemsList, setItemsList] = useState([]);
  const limitValue = 8;
  let subCatId = '0';
  const [isMoreData, setIsMoreData] = useState(true);
  // const userLanguageIdOO = useSelector(
  //   selectLanguageSelector.getSelectLanguageState
  // );
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  subCatId = urlParamsList?.[2];
  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMountCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });
  const useEffectOnsubCategory = (effect: React.EffectCallback) => {
    React.useEffect(effect, [subCatId, userLanguageId]);
  };
  useEffectOnsubCategory(() => {
    if (userLanguageId) {
      if (subCatId !== '0') {
        const params = {
          languageid: userLanguageId,
          moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
          groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS,
          maincatid: subCatId,
          subcatid: '',
          offset: offsetValue,
          limit: limitValue,
        };
        dispatch(subCategory(params));
        setOffsetValue(offsetValue + 8);
      }
    }
    return () => {
      dispatch({
        type: actionTypes.SUB_CATEGORY_SUCCESS_ACTION,
        payload: { data: null },
      });
    };
  });
  const subCatList = useSelector(selectors.getSubCategoryState);
  const displayName = urlParamsList?.[3];
  const backgroundType = urlParamsList?.[4];
  const subDivision = urlParamsList?.[5];
  const gorupId = urlParamsList?.[6];

  const loadMoreApiCall = () => {
    const params = {
      languageid: userLanguageId,
      moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID,
      groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS,
      maincatid: subCatId,
      subcatid: '',
      offset: offsetValue,
      limit: limitValue,
    };
    dispatch(subCategory(params));
    setOffsetValue(offsetValue + 8);
  };
  useEffect(() => {
    const currentData = subCatList?.data?.subcategory_details || [];
    if (currentData.length > 0 && itemsList.length === 0) {
      setItemsList(currentData);
      if (currentData.length < 8) {
        setIsMoreData(false);
      }
    } else {
      const newArray = itemsList.concat(currentData);
      setItemsList([...newArray]);
      if (currentData.length > 0 && currentData.length < 8) {
        setIsMoreData(false);
      }
    }
    // eslint-disable-next-line
  }, [subCatList.data]);

  useEffect(() => {
    if (subCatList.error !== null && itemsList.length > 0) {
      setIsMoreData(false);
    }
    // eslint-disable-next-line
  }, [subCatList.error]);
  return (
    <div className="homeLandingPage">
      <Header />
      <div className="carouselContent">
        <NewMainCarousel
          groupCatId={API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS}
        />
      </div>
      <ViewDetails
        data={itemsList}
        title={displayName}
        backgroundClass={backgroundType}
        isVewAll={false}
        listAllItems="yes"
        viewMore
        apiCall={() => loadMoreApiCall()}
        playType="shows"
        subDivision={subDivision}
        isMoreData={isMoreData}
        subCategoryID={subCatId}
        groupCatgId={gorupId}
      />
      <Footer />
    </div>
  );
};
