import React from 'react';

export default ({ chatLogs }) => {
  const chats = chatLogs.map(({ user, text }) => (
    <div className="chat-row">
      <div className="avatar">{user}</div>
      <div className="text">{text}</div>
    </div>
  ));
  return (
    <div className="chat-box">
      <div className="header" />
      <div className="body">{chats}</div>
      <div className="footer">
        <input />
      </div>
    </div>
  );
};
