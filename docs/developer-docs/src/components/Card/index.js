import React from 'react';
import clsx from 'clsx';

const Card = ({
  className,
  style,
  children,
  shadow,
}) => {
  const cardShadow = shadow ? `item shadow--${shadow}` : '';

  return (
    <div
      className={clsx('card', className, cardShadow)}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
