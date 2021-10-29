import React, { useState } from 'react';
import { Row, Button, Modal, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IModalWindowProps {
  show: boolean;
  onHide: () => void;
  handleSubmit: (
    subTitleUserpreference: any,
    subTitleColorDesc: any,
    subTitleTextSizeId: string,
    subTitleTextColorId: string
  ) => void;
  modalTitle: string;
  videoSubTitileUserpreference: string;
  subTitleSelectedColor: string;
  subTitleSizeValues: any[];
  subTitleColorValues: any[];
  subTitleTextSizeId: string;
  subTitleTextColorId: string;
}

export const SubTitleModalWindow: React.FC<IModalWindowProps> = (
  props: any
) => {
  const {
    show,
    onHide,
    modalTitle,
    videoSubTitileUserpreference,
    handleSubmit,
    subTitleSelectedColor,
    subTitleSizeValues,
    subTitleColorValues,
    subTitleTextSizeId,
    subTitleTextColorId,
  } = props;

  const {
    normalSizeDes,
    largeSizeDesc,
    extraLargeSizeDesc,
  } = subTitleSizeValues[0];
  const { whiteOnBlackDesc, blackOnWhiteDesc } = subTitleColorValues[0];

  const { t } = useTranslation('menu');

  const [textSize, setTextSize] = useState('');

  const [textColor, setTextColor] = useState('');

  const useEffectOnMount = (effect: React.EffectCallback) => {
    React.useEffect(effect, [
      videoSubTitileUserpreference,
      subTitleSelectedColor,
    ]);
  };
  useEffectOnMount(() => {
    if (
      videoSubTitileUserpreference &&
      videoSubTitileUserpreference === normalSizeDes
    ) {
      setTextSize(normalSizeDes);
    } else if (
      videoSubTitileUserpreference &&
      videoSubTitileUserpreference === largeSizeDesc
    ) {
      setTextSize(largeSizeDesc);
    } else if (
      videoSubTitileUserpreference &&
      videoSubTitileUserpreference === extraLargeSizeDesc
    ) {
      setTextSize(extraLargeSizeDesc);
    }

    if (subTitleSelectedColor === whiteOnBlackDesc) {
      setTextColor(whiteOnBlackDesc);
    } else if (subTitleSelectedColor === blackOnWhiteDesc) {
      setTextColor(blackOnWhiteDesc);
    }
  });

  const handleTextSize = (textSizeType) => {
    setTextSize(textSizeType);
  };

  const handleTextColor = (textColorType) => {
    setTextColor(textColorType);
  };

  const handleSubTitleSubmit = () => {
    if (textColor === whiteOnBlackDesc) {
      if (textSize === normalSizeDes) {
        handleSubmit(
          normalSizeDes,
          whiteOnBlackDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
      if (textSize === largeSizeDesc) {
        handleSubmit(
          largeSizeDesc,
          whiteOnBlackDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
      if (textSize === extraLargeSizeDesc) {
        handleSubmit(
          extraLargeSizeDesc,
          whiteOnBlackDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
    } else if (textColor === blackOnWhiteDesc) {
      if (textSize === normalSizeDes) {
        handleSubmit(
          normalSizeDes,
          blackOnWhiteDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
      if (textSize === largeSizeDesc) {
        handleSubmit(
          largeSizeDesc,
          blackOnWhiteDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
      if (textSize === extraLargeSizeDesc) {
        handleSubmit(
          extraLargeSizeDesc,
          blackOnWhiteDesc,
          subTitleTextSizeId,
          subTitleTextColorId
        );
      }
    }
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Body>
          <div className="modal-window__modal-title-vsubTitle videoSettings__modal__title">
            {modalTitle}
          </div>
          <div className="modal-window__modal-text videoSettings__modal__text">
            {t('textSizeOtions')}
          </div>
          <Row>
            <Col
              md={4}
              sm={12}
              className={`cursor-pointer videoSettings__modal__textSize-options-normal${
                textSize === normalSizeDes ? '-active' : ''
              }`}
              onClick={() => handleTextSize(normalSizeDes)}
            >
              {t('normalABC')}
            </Col>
            <Col
              md={4}
              sm={12}
              className={`cursor-pointer videoSettings__modal__textSize-options-large${
                textSize === largeSizeDesc ? '-active' : ''
              }`}
              onClick={() => handleTextSize(largeSizeDesc)}
            >
              {t('largeABC')}
            </Col>
            <Col
              md={4}
              sm={12}
              className={`cursor-pointer videoSettings__modal__textSize-options-extra-large${
                textSize === extraLargeSizeDesc ? '-active' : ''
              }`}
              onClick={() => handleTextSize(extraLargeSizeDesc)}
            >
              {t('extraLargeABC')}
            </Col>
          </Row>
          <div className="modal-window__modal-text videoSettings__modal__text">
            {t('subTitleOptions')}
          </div>
          <div className="videoSettings__modal__subTitle-otions">
            <div
              className="videoSettings__modal__subTitle-blackOnWhite"
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => handleTextColor(blackOnWhiteDesc)}
            >
              <div
                className={`cursor-pointer videoSettings__modal__subTitle-blackOnWhite-title${
                  textColor === blackOnWhiteDesc ? '-active' : ''
                }`}
              >
                {t('blackOnWhite')}
              </div>
              <div className="videoSettings__modal__subTitle-blackOnWhite-text">
                {t('abc123')}
              </div>
            </div>
            <div
              className="videoSettings__modal__subTitle-blackOnWhite"
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => handleTextColor(whiteOnBlackDesc)}
            >
              <div
                className={`cursor-pointer videoSettings__modal__subTitle-blackOnWhite-title${
                  textColor === whiteOnBlackDesc ? '-active' : ''
                }`}
              >
                {t('whiteOnBlack')}
              </div>
              <div className="videoSettings__modal__subTitle-whiteOnBlack-text">
                {t('abc123')}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Button className="btn-transparent" onClick={onHide}>
              {t('cancel')}
            </Button>
            <Button
              className="btn-pink"
              type="submit"
              onClick={handleSubTitleSubmit}
            >
              {t('save')}
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};
