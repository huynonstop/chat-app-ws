import React from 'react';

export const Avatar = ({ children, className = '' }) => (
  <div className={`avatar ${className} d-inline-block`}>{children}</div>
);

const AvatarWithText = ({
  className, children, src, avatarClass,
}) => (
  <div className={className}>
    <Avatar className={avatarClass}>
      <img src={src} alt="avatar" />
    </Avatar>
    {children}
  </div>
);

export default AvatarWithText;
