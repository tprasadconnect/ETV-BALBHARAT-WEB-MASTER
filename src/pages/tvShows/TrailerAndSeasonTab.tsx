/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import {
  favIcon,
  favouriteSelect,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';
import { setFavorite } from '../../services/setFavourite/setFavourite';
import { showItemDetails } from '../../services/showItemDetails/showItemDetails';
import { showsSectionCatItems } from '../../services/showsSectionCatItems/showsSectionCatItems';

import {
  showItemDetailsActionTypes,
  showItemDetailsSelectors,
} from '../../store/showItemDetails';
import {
  showsSectionCatItemsactionTypes,
  showsSectionCatItemsselectors,
} from '../../store/showsSectionCatItems';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { selectLanguageSelector } from '../../store/selectLanguage';

interface ITrailerAndSeasonTab {
  match: any;
  isFavShow: boolean;
  setFavoriteItem: any;
}

export const TrailerAndSeasonTab: React.FC<ITrailerAndSeasonTab> = (
  props: ITrailerAndSeasonTab
) => {
  const { match, isFavShow, setFavoriteItem } = props;

  const { showId } = match.params;
  const { seasonsLength } = match.params;
  const { seasonId } = match.params;
  const { itemId } = match.params;

  const dispatch = useDispatch();
  const history = useHistory();
  const urlParams = history.location.pathname.split('/');

  const showItemDetailsState = useSelector(
    showItemDetailsSelectors.getShowItemDetailsState
  );

  const tvshowsSubCatState = useSelector(
    showsSectionCatItemsselectors.getShowsSectionCatItemsState
  );
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);

  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const [currentActiveTab, setcurrentActiveTab] = useState(seasonId);
  const [episodesList, setEpisodesList] = useState<any[]>([]);

  const useEffectOnSectionItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [itemId]);
  };
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );
  const callSectionCatItems = (seasonVal) => {
    setcurrentActiveTab(seasonVal);
    dispatch({
      type:
        showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_SUCCESS_ACTION,
      payload: { data: null },
    });
    const getMainCatID = () => {
      if (urlParams[2].includes('originals'))
        return API_REQ_PARAM_CONSTANTS.TV_SHOW_ORIGINAL_CAT_ID;
      if (urlParams[2].includes('global'))
        return API_REQ_PARAM_CONSTANTS.TV_SHOW_GLOBAL_CAT_ID;
      return null;
    };
    const params = {
      languageid: userLanguageId,
      moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
      groupcatid: API_REQ_PARAM_CONSTANTS.GROUP_CAT_ID_SHOWS, // fixed
      maincatid: getMainCatID(),
      subcatid: showId,
      season: seasonVal,
      userid: userid || '',
      kidid: kidid || '',
      limit: '',
      offset: '',
    };
    dispatch(showsSectionCatItems(params));
  };
  useEffectOnSectionItems(() => {
    if (episodesList.length === 0) callSectionCatItems(0);
  });
  const callItemDetails = (contentId) => {
    const params = {
      kidid: kidid || '',
      userid: userid || '',
      contentid: contentId,
    };
    dispatch(showItemDetails(params));
  };
  useEffect(() => {
    const section_details = tvshowsSubCatState.data?.section_details || [];
    setEpisodesList(section_details);
    if (!itemId && section_details.length > 0) {
      callItemDetails(section_details[0].content_id);
    }
    // eslint-disable-next-line
  }, [tvshowsSubCatState.data]);

  const useEffectOnSetFavShow = (effect: React.EffectCallback) => {
    React.useEffect(effect, [isFavShow]);
  };
  useEffectOnSetFavShow(() => {
    const epiList = [...episodesList];
    epiList.forEach((episode) => {
      if (episode.content_id === itemId) {
        Object.assign(episode, { isfavourite: isFavShow });
      }
    });
    setEpisodesList(epiList);
  });

  const onEpisodeClick = (seasonNo, contentId) => {
    dispatch({
      type:
        showsSectionCatItemsactionTypes.SHOWS_SECTION_CAT_ITEMS_RESET_ACTION,
    });
    dispatch({
      type: showItemDetailsActionTypes.SHOW_ITEM_DETAILS_RESET_ACTION,
    });
    history.push(
      `/tvShows/${urlParams[2]}/details/${seasonNo}/${seasonsLength}/${showId}/${contentId}`
    );
    callSectionCatItems(seasonNo);
  };

  const callSetFavorite = (contentId) => {
    const params = {
      userid,
      kidid: kidid || '',
      contentid: contentId,
    };
    dispatch(setFavorite(params));
  };

  const handleEpisodeFav = (contentId, isFavEpi, isActiveEpi) => {
    const epiList = [...episodesList];
    if (!isActiveEpi) {
      callSetFavorite(contentId);
    } else {
      setFavoriteItem(contentId);
    }
    callSetFavorite(contentId);
    epiList.forEach((episode) => {
      if (episode.content_id === contentId) {
        Object.assign(episode, { isfavourite: !isFavEpi });
      }
    });
    setEpisodesList(epiList);
    if (itemId === contentId) {
      setFavoriteItem(contentId);
    }
  };

  //   const setFavoriteItem = (contentId: string) => {
  //     const epiList = [...episodesList];
  //     callSetFavorite(contentId);
  //     epiList.forEach((episode) => {
  //       if (episode.content_id === contentId) {
  //         Object.assign(episode, { isfavourite: !episode.isfavourite });
  //       }
  //     });
  //     setEpisodesList(epiList);
  //   };

  return (
    <>
      {showItemDetailsState.data?.season_details?.length > 0 && (
        <Container className="tone-card shows mb-5">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={currentActiveTab}
            activeKey={currentActiveTab}
          >
            <Nav variant="pills">
              {showItemDetailsState.data?.season_details?.map((season) => (
                <Nav.Item
                  onClick={() => {
                    callSectionCatItems(season.season_code);
                  }}
                >
                  <Nav.Link eventKey={season.season_code}>
                    {season.season_name}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Tab.Content>
              {showItemDetailsState.data?.season_details?.map((season) => (
                <Tab.Pane eventKey={season.season_code}>
                  <Row>
                    {episodesList?.map((tvShow) => {
                      const {
                        content_id,
                        feature_image,
                        episode,
                        title,
                        seasons,
                        isfavourite,
                        title_en,
                      } = tvShow;
                      return (
                        <>
                          <Col md={3} xs={6} key={content_id}>
                            <div className="show-card">
                              <div className="banner-img">
                                <img
                                  className="img-fluid makeCornerEdges"
                                  alt="show-card-img"
                                  src={feature_image}
                                />
                                <div className="banner-img-hover-action">
                                  <div
                                    className="play-btn"
                                    tabIndex={0}
                                    role="button"
                                    onKeyPress={() => {}}
                                    onClick={() =>
                                      onEpisodeClick(seasons, content_id)
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      alt="show-card-img"
                                      src={tplayYellowIcon}
                                    />
                                  </div>
                                </div>
                              </div>
                              <h5 className="title">
                                {title !== '' ? title : title_en}
                              </h5>
                              <div className="card-meta-info">
                                <span>
                                  S{seasons} &nbsp; &#8226; &nbsp; EP {episode}
                                </span>
                                <div className="d-flex">
                                  {userid && (
                                    <div
                                      className="mr-2"
                                      tabIndex={0}
                                      role="button"
                                      onKeyPress={() => {}}
                                      onClick={() =>
                                        handleEpisodeFav(
                                          content_id,
                                          isfavourite,
                                          true
                                        )
                                      }
                                    >
                                      <img
                                        src={
                                          isfavourite
                                            ? favouriteSelect
                                            : favIcon
                                        }
                                        alt="fav-icon"
                                      />
                                    </div>
                                  )}
                                  {/* <div>
                                    <img src={shareIcon} alt="share-icon" />
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </Container>
      )}
    </>
  );
};
