import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const CardHeader = ({
  className,
  style,
  children,
  textAlign,
  variant,
  italic = false,
  noDecoration = false,
  transform,
  breakWord = false,
  truncate = false,
  weight,
  to,
  href,
}) => {
  const text = textAlign ? `text--${textAlign}` : '';
  const textColor = variant ? `text--${variant}` : '';
  const textItalic = italic ? 'text--italic' : '';
  const textDecoration = noDecoration ? 'text-no-decoration' : '';
  const textType = transform ? `text--${transform}` : '';
  const textBreak = breakWord ? 'text--break' : '';
  const textTruncate = truncate ? 'text--truncate' : '';
  const textWeight = weight ? `text--${weight}` : '';

  const isLink = Boolean(to || href);
  const Wrapper = isLink ? Link : 'div';

  const wrapperProps = isLink
    ? { to, href }
    : {};

  return (
    <div className="card__header">
      <Wrapper
        {...wrapperProps}
        className={clsx(
          className,
          text,
          textType,
          textColor,
          textItalic,
          textDecoration,
          textBreak,
          textTruncate,
          textWeight
        )}
        style={style}
      >
        {children}
      </Wrapper>
    </div>
  );
};

export default CardHeader;