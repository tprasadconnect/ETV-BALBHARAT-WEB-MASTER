/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import {
  favIcon,
  favouriteSelect,
  tplayYellowIcon,
} from '../../constants/iconImageConstant';
import { selectors as userStoreSelectors } from '../../store/userStore';
import { showsSectionCatItems } from '../../services/showsSectionCatItems/showsSectionCatItems';
import { showsSectionCatItemsselectors } from '../../store/showsSectionCatItems';
import { API_REQ_PARAM_CONSTANTS } from '../../constants/apiReqParamConstants';
import { ROUTER_URL_CONSTANT } from '../../constants/routerUrlConstant';
import { setFavorite } from '../../services/setFavourite/setFavourite';
import { selectLanguageSelector } from '../../store/selectLanguage';

interface ShowProps {
  seasonDetails: any;
  groupId: any;
  catId: any;
}

export const Shows: React.FC<ShowProps> = (props: any) => {
  const { seasonDetails, groupId, catId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const urlParamsList = history.location.pathname.split('/');
  const subcatId = urlParamsList?.[4];
  const seasonId = '';
  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;
  const [isFav, setIsFav] = useState(false);
  const [showList, setEpisodesList] = useState<any[]>([]);
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  let activeTabId = 0;

  const callSectionCatItems = (subcatid, season) => {
    if (userLanguageId) {
      const params = {
        languageid: userLanguageId,
        moduleid: API_REQ_PARAM_CONSTANTS.MODULE_ID, // fixed
        groupcatid: groupId, // fixed
        maincatid: catId,
        subcatid,
        season,
        userid: userid || '',
        kidid: kidid || '',
        limit: '',
        offset: '',
      };
      dispatch(showsSectionCatItems(params));
    }
  };

  const useEffectOnSectionItems = (effect: React.EffectCallback) => {
    React.useEffect(effect, [subcatId, seasonId, userLanguageId]);
  };
  useEffectOnSectionItems(() => {
    if (userLanguageId) {
      callSectionCatItems(subcatId, seasonId);
    }
  });

  const showsSubCatState = useSelector(
    showsSectionCatItemsselectors.getShowsSectionCatItemsState
  );

  useEffect(() => {
    setEpisodesList(showsSubCatState?.data?.section_details);
  }, [showsSubCatState]);

  const getTabData = (id) => {
    activeTabId = id;
  };

  const executeOnClick = () => {};

  // Play selected episode
  const onEpisodeClick = (contentId, groupCatId, categoryId) => {
    if (categoryId === '1') {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${urlParamsList[2]}/${urlParamsList[3]}/${urlParamsList[4]}/${contentId}`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === '2') {
      history.push({
        pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${urlParamsList[2]}/${urlParamsList[3]}/${urlParamsList[4]}/${contentId}`,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // favourite episode
  const callSetFavorite = (contentId) => {
    const params = {
      userid,
      kidid: kidid || '',
      contentid: contentId,
    };
    dispatch(setFavorite(params));
  };

  const setFavoriteItem = (contentId: string) => {
    const epiList = [...showList];
    setIsFav(!isFav);
    callSetFavorite(contentId);
    epiList.forEach((episode) => {
      if (episode.content_id === contentId) {
        Object.assign(episode, { isfavourite: !episode.isfavourite });
      }
    });
    setEpisodesList(epiList);
  };

  const handleEpisodeFav = (contentId, isFavEpi, isActiveEpi) => {
    const epiList = [...showList];
    if (!isActiveEpi) {
      callSetFavorite(contentId);
    } else {
      setFavoriteItem(contentId);
    }

    epiList.forEach((episode) => {
      if (episode.content_id === contentId) {
        Object.assign(episode, { isfavourite: !isFavEpi });
      }
    });
    setEpisodesList(epiList);
  };

  return (
    <div className="tone-card shows mb-4">
      <h2 className="block-title">Shows</h2>
      {seasonDetails && (
        <Tab.Container id="left-tabs-example" defaultActiveKey={activeTabId}>
          <Nav variant="pills">
            {seasonDetails.map((season) => (
              <Nav.Item>
                <Nav.Link
                  eventKey={season.season_code}
                  onSelect={() => getTabData(season.season_code)}
                >
                  {season.season_name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          {showList && (
            <Tab.Content>
              {seasonDetails.map((seasondetail) => (
                <Tab.Pane eventKey={seasondetail.season_code}>
                  <Row>
                    {showList.map((season) => {
                      const {
                        content_id,
                        feature_image,
                        episode,
                        title,
                        short_description,
                        seasons,
                        isfavourite,
                        description,
                      } = season;
                      return (
                        <React.Fragment key={content_id}>
                          {season.seasons > 0 && seasondetail.season_code > 0 && (
                            <Col md={3} xs={6}>
                              <div className="show-card">
                                <div className="banner-img">
                                  <img
                                    className="img-fluid showSeasonCard"
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
                                        onEpisodeClick(
                                          content_id,
                                          groupId,
                                          catId
                                        )
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
                                <h5 className="title">{title}</h5>
                                <div className="card-meta-info">
                                  <span>
                                    S{seasons} &nbsp; &#8226; &nbsp; EP{' '}
                                    {episode}
                                  </span>
                                  <div className="d-flex">
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
                                    {/* <div>
                                      <img src={shareIcon} alt="share-icon" />
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {seasondetail.season_name === 'Trailers' &&
                            season.seasons === '0' && (
                              <Col md={12}>
                                <div className="trailer-card">
                                  <div className="banner-img">
                                    <img
                                      className="img-fluid showSeasonCard"
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
                                          onEpisodeClick(
                                            content_id,
                                            groupId,
                                            catId
                                          )
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
                                  <div className="d-block calc-width">
                                    <h5 className="title">{title}</h5>
                                    <h6 className="subtitle">
                                      {short_description}
                                    </h6>
                                    <p className="description">
                                      <ShowMoreText
                                        lines={1}
                                        more="More"
                                        less="Less"
                                        className="userContent content-css moviesDetails__video-desc-details"
                                        anchorClass="my-anchor-css-class"
                                        onClick={executeOnClick}
                                        expanded={false}
                                        width={700}
                                      >
                                        <div
                                          // eslint-disable-next-line react/no-danger
                                          dangerouslySetInnerHTML={{
                                            __html: description,
                                          }}
                                        />
                                      </ShowMoreText>
                                    </p>
                                  </div>
                                  <div className="card-meta-info">
                                    <div
                                      className="d-flex"
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
                                      <picture className="mr-2">
                                        <img
                                          src={
                                            isfavourite
                                              ? favouriteSelect
                                              : favIcon
                                          }
                                          alt="fav-icon"
                                        />
                                      </picture>
                                      {/* <picture>
                                        <img src={shareIcon} alt="share-icon" />
                                      </picture> */}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            )}
                        </React.Fragment>
                      );
                    })}
                  </Row>
                </Tab.Pane>
              ))}
            </Tab.Content>
          )}
        </Tab.Container>
      )}
    </div>
  );
};
