import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { Footer } from '../appFooter/Footer';
import {
  chbgleft,
  chbgright,
  chimgone,
  chimgtwo,
  chimgthree,
} from '../../constants/iconImageConstant';
import { scheduledPrograms } from '../../services/scheduledPrograms/scheduledPrograms';
import { selectors } from '../../store/scheduledPrograms';
import { categoryMaster } from '../../services/categoryMasters/categoryMaster';
import { selectLanguageSelector } from '../../store/selectLanguage';

export const ChannelSchedule: React.FC = () => {
  const dispatch = useDispatch();
  const userLanguageId = useSelector(
    selectLanguageSelector.getSelectLanguageId
  );

  const useEffectOnScheduledPrograms = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnScheduledPrograms(() => {
    if (userLanguageId) {
      const params = '';
      dispatch(scheduledPrograms(params));
    }
  });

  const scheduledProgramsData = useSelector(
    selectors.getScheduledProgramsState
  );

  // const useEffectOnseheduledData = (effect: React.EffectCallback) => {
  //   React.useEffect(effect, [scheduledProgramsData]);
  // };
  // useEffectOnseheduledData(() => {
  //   console.log('mydata===========', scheduledProgramsData);
  // });

  const useEffectOnMountCatgMaster = (effect: React.EffectCallback) => {
    React.useEffect(effect, [userLanguageId]);
  };
  useEffectOnMountCatgMaster(() => {
    if (userLanguageId) {
      const params = { languageid: userLanguageId };
      dispatch(categoryMaster(params));
    }
  });

  return (
    <>
      <Header />
      <div className="channelschedule">
        <div className="bg-left">
          <img src={chbgleft} alt="schedule" />
        </div>
        <div className="bg-right">
          <img src={chbgright} alt="schedule" />
        </div>
        <h1 className="text-center text-uppercase title_schedule">
          channel Schedule
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="schedule_list">
                <img
                  src={
                    scheduledProgramsData?.data?.[0]?.current_schedule?.[0]
                      ?.show_thumbnail
                      ? scheduledProgramsData?.data?.[0]?.current_schedule?.[0]
                          ?.show_thumbnail
                      : chimgthree
                  }
                  alt="schedule"
                />
                <div className="Schedule_details">
                  <div className="badge badge-primary">now showing</div>
                  <p className="schedule_titile">
                    {
                      scheduledProgramsData?.data?.[0]?.current_schedule?.[0]
                        ?.title
                    }
                  </p>
                  <p className="schedule_timeperiod">
                    {' '}
                    {
                      scheduledProgramsData?.data?.[0]?.current_schedule?.[0]
                        ?.from_time
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="schedule_list">
                    <img
                      src={
                        scheduledProgramsData?.data?.[0]?.upnext_schedule?.[0]
                          ?.show_thumbnail
                          ? scheduledProgramsData?.data?.[0]
                              ?.upnext_schedule?.[0]?.show_thumbnail
                          : chimgone
                      }
                      alt="schedule"
                    />
                    <div className="Schedule_details">
                      <div className="badge badge-light">up next</div>
                      <p className="schedule_titile">
                        {
                          scheduledProgramsData?.data?.[0]?.upnext_schedule?.[0]
                            ?.title
                        }
                      </p>
                      <p className="schedule_timeperiod">
                        {' '}
                        {
                          scheduledProgramsData?.data?.[0]?.upnext_schedule?.[0]
                            ?.from_time
                        }
                      </p>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="schedule_list">
                    <img
                      src={
                        scheduledProgramsData?.data?.[0]?.later_schedule?.[0]
                          ?.show_thumbnail
                          ? scheduledProgramsData?.data?.[0]
                              ?.later_schedule?.[0]?.show_thumbnail
                          : chimgtwo
                      }
                      alt="schedule"
                    />
                    <div className="Schedule_details">
                      <div className="badge badge-light">LATER</div>
                      <p className="schedule_titile">
                        {' '}
                        {
                          scheduledProgramsData?.data?.[0]?.later_schedule?.[0]
                            ?.title
                        }
                      </p>
                      <p className="schedule_timeperiod">
                        {
                          scheduledProgramsData?.data?.[0]?.later_schedule?.[0]
                            ?.from_time
                        }
                      </p>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
