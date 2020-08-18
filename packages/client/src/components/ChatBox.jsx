import React, { useEffect, useState } from 'react';
import { socket as createSocketClient } from '../utils';

const chatLogs = [
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
];

export default () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(chatLogs);
    createSocketClient();
  }, []);
  const chats = messages.map(({ user, text }) => (
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
