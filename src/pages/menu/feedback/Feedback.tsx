import React from 'react';
import { Col, Row, Image, Button, Container, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTER_URL_CONSTANT } from '../../../constants/routerUrlConstant';
import { backIcon } from '../../../constants/iconImageConstant';
import { feedback } from '../../../services/feedback/feedback';
import { selectors } from '../../../store/feedback';
import { selectors as settinngFeedbackSelectors } from '../../../store/settingFeedback';
import { Loader } from '../../../components/Loader';
import { selectors as userStoreSelectors } from '../../../store/userStore';
import { API_REQ_PARAM_CONSTANTS } from '../../../constants/apiReqParamConstants';
import { settingFeedback } from '../../../services/settingFeedback/settingFeedback';

export function Feedback() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation(['common', 'menu']);

  const useEffectOnMountSettingFeedback = (effect: React.EffectCallback) => {
    React.useEffect(effect, []);
  };
  useEffectOnMountSettingFeedback(() => {
    const params = {
      languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
    };
    dispatch(settingFeedback(params));
  });

  const settingFeedbackState = useSelector(
    settinngFeedbackSelectors.getSettingFeedbackState
  );

  const [showLoader, setShowLoader] = React.useState(false);
  const [feedbackArr, setFeedbackArr] = React.useState<any[]>([]);
  const [feedbackId, setFeedbackId] = React.useState('');
  const [feedbackComment, setFeedbackComment] = React.useState('');
  const [emojiError, setEmojiError] = React.useState(false);

  const useEffectOnMountSF = (effect: React.EffectCallback) => {
    React.useEffect(effect, [settingFeedbackState]);
  };
  useEffectOnMountSF(() => {
    if (settingFeedbackState.data) {
      const emojiArray =
        settingFeedbackState.data &&
        settingFeedbackState.data.module_details &&
        settingFeedbackState.data.module_details[0].optiondetails &&
        settingFeedbackState.data.module_details[0].optiondetails[0]
          .value_data &&
        settingFeedbackState.data.module_details[0].optiondetails[0]
          .value_data[0].values;

      emojiArray.forEach((el) => {
        Object.assign(el, { isSelected: false });
      });
      setFeedbackArr(emojiArray);
    }
    setShowLoader(settingFeedbackState.loader);
  });

  const userStoreState = useSelector(userStoreSelectors.getUserStoreState);
  const userid = userStoreState.data && userStoreState.data.userid;
  const kidid = userStoreState.data && userStoreState.data.selectedKidid;

  const feedbackState = useSelector(selectors.getFeedbackState);
  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [feedbackState]);
  };
  useEffectOnMount(() => {
    setShowLoader(feedbackState.loader);
  });

  const handleFeedbackSubmit = () => {
    const fbArr = [...feedbackArr];
    const selectedEmoji = fbArr.find((el) => el.isSelected === true);
    if (selectedEmoji) {
      const params = {
        userid,
        kidid: kidid || '',
        languageid: API_REQ_PARAM_CONSTANTS.LANGUAGE_EN_ID,
        comments: feedbackComment,
        experianceid: feedbackId,
        type: API_REQ_PARAM_CONSTANTS.FEEDBACK_FEEDBACK,
      };
      dispatch(feedback(params));
      setFeedbackComment('');
      fbArr.forEach((el) => {
        Object.assign(el, { isSelected: false });
      });
      history.push(ROUTER_URL_CONSTANT.MENU);
    } else {
      setEmojiError(true);
    }
  };

  const handleFeedbackCommentChange = (e) => {
    setFeedbackComment(e.target.value);
  };

  const handleEmojiSelection = (id) => {
    const arr = [...feedbackArr];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === id) {
        arr[i].isSelected = true;
      } else {
        arr[i].isSelected = false;
      }
    }
    setFeedbackArr(arr);
    setEmojiError(false);
    setFeedbackId(id);
  };

  return (
    <div className="feedback main-background content-padding d-flex align-items-center">
      <div className="w-100">
        <Row>
          <Col md={1} xs={6} className="d-none d-lg-block" />
          <Col md={10}>
            <div className="edit-account__container">
              <div className="edit-account__back-btn pl-sm-3 pb-3">
                <div>
                  <Image alt="" src={backIcon} />
                </div>
                <Link to={ROUTER_URL_CONSTANT.MENU}>
                  <span className="edit-account__back-btn__back-text">
                    {t('common:back')}
                  </span>
                </Link>
              </div>
              <Row className="pt-3 pl-sm-3">
                <Col md={3} sm={12} className="notifications__heading">
                  {t('menu:feedback')}
                </Col>
              </Row>
              <Row className="pt-3 pl-sm-3">
                <Col sm={6}>
                  <Container>
                    <Row className="feedbackAsk">{t('menu:experience')}</Row>
                    <Row className="emoji-container">
                      {feedbackArr &&
                        feedbackArr.map((emoji) => {
                          return (
                            <Col
                              md={2}
                              xs={4}
                              key={emoji.id}
                              className="emoji-icon-desc"
                            >
                              <div
                                className="emoji-btn"
                                onKeyPress={() => {}}
                                tabIndex={0}
                                role="button"
                                onClick={() => handleEmojiSelection(emoji.id)}
                              >
                                <img
                                  src={emoji.image}
                                  alt="emoji icon"
                                  className={`emoji-icon ${
                                    emoji.isSelected ? 'emoji-active' : ''
                                  }`}
                                />
                              </div>
                              <div className="emoji-desc">
                                {emoji.description}
                              </div>
                            </Col>
                          );
                        })}
                    </Row>
                    {emojiError && (
                      <div className="emoji-error">
                        {t('menu:emojirequired')}
                      </div>
                    )}
                  </Container>
                </Col>
                <Col sm={6}>
                  <Row className="feedback-comments">{t('menu:comments')}</Row>
                  <Row>
                    <Form.Control
                      as="textarea"
                      value={feedbackComment}
                      onChange={handleFeedbackCommentChange}
                      rows={3}
                      placeholder="Type Here"
                      className="feedback-comments-input"
                    />
                  </Row>
                  <Row className="feedback-submit-btn">
                    <Button
                      className="btn-pink float-right fb-submit"
                      onClick={handleFeedbackSubmit}
                    >
                      {t('common:submit')}
                    </Button>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={1} />
        </Row>
      </div>
      {showLoader && <Loader />}
    </div>
  );
}
