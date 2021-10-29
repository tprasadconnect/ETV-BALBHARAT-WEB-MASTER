import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { leftArrow, rightArrow } from '../constants/iconImageConstant';

const Arrow = (props: any) => {
  const { text, className } = props;
  return (
    <div className={`${className}`}>
      {text === 'left' ? (
        <img src={leftArrow} alt={className} />
      ) : (
        <img src={rightArrow} alt={className} />
      )}
    </div>
  );
};

export const ArrowLeft = Arrow({ text: 'left', className: 'arrow-prev' });
export const ArrowRight = Arrow({ text: 'right', className: 'arrow-next' });

export function HorizontalScroll(props: any) {
  const {
    menu,
    onFirstItemVisible,
    onLastItemVisible,
    onUpdate,
    onSelect,
  } = props;

  return (
    <ScrollMenu
      alignCenter={false}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      clickWhenDrag={false}
      data={menu}
      dragging
      hideArrows={false}
      hideSingleArrow={false}
      onFirstItemVisible={onFirstItemVisible}
      onLastItemVisible={onLastItemVisible}
      onSelect={onSelect}
      onUpdate={onUpdate}
      // ref={el => (menu = el)}
      scrollToSelected={false}
      // selected={state.selected}
      transition={+0.3}
      translate={0}
      wheel={false}
    />
  );
}
