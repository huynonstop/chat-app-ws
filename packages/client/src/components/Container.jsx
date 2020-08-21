import React from 'react';

const Container = ({
  fluid = false,
  flex = false,
  children,
  style = {},
  className,
}) => (
  <div
    className={className}
    style={{
      maxWidth: fluid ? undefined : '1440px',
      display: flex ? 'flex' : undefined,
      margin: '0 auto',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Container;
