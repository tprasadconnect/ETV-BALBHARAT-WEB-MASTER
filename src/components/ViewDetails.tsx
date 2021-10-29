import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { viewAll } from '../constants/iconImageConstant';
import { ROUTER_URL_CONSTANT } from '../constants/routerUrlConstant';
// import { API_REQ_PARAM_CONSTANTS } from '../constants/apiReqParamConstants';

interface IViewDetails {
  data: any;
  title: string;
  backgroundClass: string;
  forIndivudualClass?: string;
  cardsBackground?: string;
  extraCard?: any;
  isVewAll?: boolean;
  loadMore?: boolean;
  redirectUrl?: string;
  listAllItems?: string;
  contentType?: string;
  viewMore?: boolean;
  subCategoryID?: string;
  apiCall?: any;
  playType?: any;
  subDivision?: any;
  isMoreData?: boolean;
  groupCatgId?: string;
  moviesApiCall?: any;
}

export const ViewDetails: React.FC<IViewDetails> = (props: IViewDetails) => {
  const history = useHistory();
  const {
    data,
    backgroundClass,
    title,
    extraCard,
    isVewAll,
    redirectUrl,
    listAllItems,
    cardsBackground,
    viewMore,
    subCategoryID,
    apiCall,
    forIndivudualClass,
    playType,
    subDivision,
    isMoreData,
    loadMore,
    groupCatgId,
    moviesApiCall,
  } = props;

  // To check page is accessing from web or mobile
  const [isWebView, setIsWebView] = useState(false);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsWebView(true);
    }
  }, []);
  // const gotoPlayerPage = (index, seasonLength, subDiv) => {
  //   if (playType === 'movies') {
  //     history.push({
  //       pathname: `${ROUTER_URL_CONSTANT.MOVIES_DETAILS}/${index}`,
  //     });
  //   } else if (playType === 'shows') {
  //     if (subDiv === 'globals') {
  //       history.push({
  //         pathname: `${ROUTER_URL_CONSTANT.GLOBAL_DETAILS}/${index}/${seasonLength}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_TRAILER}`,
  //       });
  //     } else {
  //       history.push({
  //         pathname: `${ROUTER_URL_CONSTANT.ORIGINALS_DETAILS}/${index}/${seasonLength}/${API_REQ_PARAM_CONSTANTS.TV_SHOW_SEASON_ONE}`,
  //       });
  //     }
  //   }
  // };
  const gotoDetails = (groupCatg, catgId, subCatgId) => {
    history.push(
      `${ROUTER_URL_CONSTANT.TOONS_DETAIL}/${groupCatg}/${catgId}/${subCatgId}`
    );
  };
  return (
    <div key={title} className={`viewDetails ${backgroundClass}`}>
      <div className={`container ${cardsBackground}`}>
        <h2 className="text-center">{title}</h2>
        <div className="row">
          {data &&
            isWebView &&
            listAllItems !== 'yes' &&
            data.length > 0 &&
            data.map(
              (eachItem, index) =>
                index < 4 && (
                  <div className="col-6 col-lg-3" key={eachItem.sub_catg_id}>
                    <div className="box">
                      <div>
                        {groupCatgId && subCategoryID && (
                          <Image
                            className="b-img cardMainPic"
                            src={eachItem.sub_catg_featured_image}
                            onClick={() =>
                              gotoDetails(
                                groupCatgId,
                                subCategoryID,
                                eachItem.sub_catg_id
                              )
                            }
                          />
                        )}
                        {playType === 'movies' && (
                          <Image
                            className="b-img cardMainPic"
                            src={eachItem.sub_catg_featured_image}
                            onClick={() => moviesApiCall(eachItem.sub_catg_id)}
                          />
                        )}
                      </div>
                      {/* <div className="name">{eachItem.sub_catg_name}</div> */}
                    </div>
                  </div>
                )
            )}

          {data &&
            isWebView &&
            listAllItems === 'yes' &&
            data.length > 0 &&
            data.map((eachItem) => (
              <div className="col-6 col-lg-3" key={eachItem.sub_catg_id}>
                <div className="box">
                  <div>
                    {groupCatgId && subCategoryID && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() =>
                          gotoDetails(
                            groupCatgId,
                            subCategoryID,
                            eachItem.sub_catg_id
                          )
                        }
                      />
                    )}
                    {eachItem.subId && eachItem.grpId && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() =>
                          gotoDetails(
                            eachItem.grpId,
                            eachItem.subId,
                            eachItem.sub_catg_id
                          )
                        }
                      />
                    )}
                    {playType === 'movies' && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() => moviesApiCall(eachItem.sub_catg_id)}
                      />
                    )}
                  </div>
                  {/* <div className="name">{eachItem.sub_catg_name}</div> */}
                </div>
              </div>
            ))}
          {data &&
            !isWebView &&
            listAllItems !== 'yes' &&
            data.map(
              (eachItem, index) =>
                index < 8 && (
                  <div className="col-6 col-lg-3" key={eachItem.sub_catg_id}>
                    <div className="box">
                      <div>
                        {groupCatgId && subCategoryID && (
                          <Image
                            className="b-img cardMainPic"
                            src={eachItem.sub_catg_featured_image}
                            onClick={() =>
                              gotoDetails(
                                groupCatgId,
                                subCategoryID,
                                eachItem.sub_catg_id
                              )
                            }
                          />
                        )}
                        {playType === 'movies' && (
                          <Image
                            className="b-img cardMainPic"
                            src={eachItem.sub_catg_featured_image}
                            onClick={() => moviesApiCall(eachItem.sub_catg_id)}
                          />
                        )}
                      </div>
                      {/* <div className="name">{eachItem.sub_catg_name}</div> */}
                    </div>
                  </div>
                )
            )}

          {data &&
            !isWebView &&
            listAllItems === 'yes' &&
            data.map((eachItem) => (
              <div className="col-6 col-lg-3" key={eachItem.sub_catg_id}>
                <div className="box">
                  <div>
                    {groupCatgId && subCategoryID && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() =>
                          gotoDetails(
                            groupCatgId,
                            subCategoryID,
                            eachItem.sub_catg_id
                          )
                        }
                      />
                    )}
                    {eachItem.subId && eachItem.grpId && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() =>
                          gotoDetails(
                            eachItem.grpId,
                            eachItem.subId,
                            eachItem.sub_catg_id
                          )
                        }
                      />
                    )}

                    {playType === 'movies' && (
                      <Image
                        className="b-img cardMainPic"
                        src={eachItem.sub_catg_featured_image}
                        onClick={() => moviesApiCall(eachItem.sub_catg_id)}
                      />
                    )}
                  </div>
                  {/* <div className="name">{eachItem.sub_catg_name}</div> */}
                </div>
              </div>
            ))}
        </div>
        {isVewAll && (
          <div
            aria-hidden="true"
            onClick={() => {
              if (redirectUrl) {
                let redirectUrlNew = { pathname: `${redirectUrl}` };
                if (subCategoryID) {
                  redirectUrlNew = {
                    pathname: `${redirectUrl}/${subCategoryID}/${title}/${forIndivudualClass}/${subDivision}/${groupCatgId}`,
                  };
                }
                history.push(redirectUrlNew);
              }
            }}
            className="text-center cursor-pointer"
          >
            <Image src={viewAll} />
          </div>
        )}
        {viewMore && (
          <div
            aria-hidden="true"
            onClick={() => {
              apiCall();
            }}
            className="text-center"
          >
            {isMoreData && (
              <Button className="btn-yeelow-dark" type="button">
                View More
              </Button>
            )}
          </div>
        )}
        {loadMore && (
          <div
            aria-hidden="true"
            onClick={() => {
              apiCall();
            }}
            className="text-center"
          >
            {isMoreData && (
              <Button className="btn-yeelow-dark" type="button">
                Load More
              </Button>
            )}
          </div>
        )}

        {extraCard}
      </div>
    </div>
  );
};
