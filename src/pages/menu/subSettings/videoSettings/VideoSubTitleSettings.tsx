/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SubTitleModalWindow } from './SubTitleModalWindow';

interface IVSubTitle {
  data: any;
  handleSubTitleSettingsSubmit: (
    subTitleUserpreference: any,
    subTitleColorDesc: any,
    subTitleTextSizeId: string,
    subTitleTextColorId: string
  ) => void;
}

export const VideoSubTitleSettings = ({
  data,
  handleSubTitleSettingsSubmit,
}: IVSubTitle) => {
  const { option, subText, additional_options } = data;
  const { value_data: textSize } = additional_options[0];
  const {
    setting_id: textSizeSettingId,
    userpreference: textSizePreference,
    values: textSizeValues,
  } = textSize[0];
  const { description: textNormal } = textSizeValues[0];
  const { description: textLarge } = textSizeValues[1];
  const { description: textExtraLarge } = textSizeValues[2];

  const { value_data: textColor } = additional_options[1];
  const {
    setting_id: textColorSettingId,
    userpreference: textColorPreference,
    values: textColorValues,
  } = textColor[0];
  const { description: textColorWhite } = textColorValues[0];
  const { description: textColorBlack } = textColorValues[1];

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Row
        onClick={() => {
          setShowModal(true);
        }}
        className="cursor-pointer"
      >
        <Col sm={10} className="font-weight-bold">
          <div className="videoSettings__optionTitle">{option}</div>
          <div className="videoSettings__subText">{subText}</div>
        </Col>
      </Row>
      <SubTitleModalWindow
        show={showModal}
        onHide={() => setShowModal(false)}
        handleSubmit={handleSubTitleSettingsSubmit}
        modalTitle={option}
        subTitleSizeValues={[
          {
            normalSizeDes: textNormal,
            largeSizeDesc: textLarge,
            extraLargeSizeDesc: textExtraLarge,
          },
        ]}
        subTitleColorValues={[
          {
            whiteOnBlackDesc: textColorWhite,
            blackOnWhiteDesc: textColorBlack,
          },
        ]}
        subTitleTextSizeId={textSizeSettingId}
        videoSubTitileUserpreference={textSizePreference}
        subTitleTextColorId={textColorSettingId}
        subTitleSelectedColor={textColorPreference}
      />
    </>
  );
};
