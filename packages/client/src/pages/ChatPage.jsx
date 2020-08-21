import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from '@reach/router';
import { countIOState } from '../store/state';
import { socket as createSocketClient, api } from '../utils';
import ChatBox from '../components/ChatBox';
import Container from '../components/Container';

const chatLogs = [
  {
    user: 'h33',
    text:
      'abc1asdasjdjasdjas\njdaskjdc1asdasjdjasdjasjdaskjdjkasdjkac1asdasjdjasdjasjdaskjdjkasdjkac1asdasjdjasdjasjdaskjdjkasdjkajkasdjkasjdkasjkdasjk',
  },
  { user: 'h32', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
].map((text, index) => ({ ...text, key: index }));

export default () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const setCount = useSetRecoilState(countIOState);
  useEffect(() => {
    setMessages(chatLogs);
    const socket = createSocketClient();
    socket.on('countConnect-update', ({ data, message }) => {
      setCount(data);
      console.log(message);
    });
    socket.on('message-create', ({ message }) => {
      console.log('a message from you friend');
    });
  }, [setMessages, setCount]);
  const onSubmit = async e => {
    e.preventDefault();
    if (!messageInput) return;
    const options = {
      method: 'POST',
      data: { message: messageInput },
    };
    try {
      console.log('Send');
      const data = await api('message', options);
      setMessageInput('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container flex fluid className="page">
      <div className="sidebar flex-1/4-lg border h-screen of-y-a scrollbar">
        Side bar room chat
      </div>
      <ChatBox
        className="d-flex flex-1/2-md h-screen of-y-h"
        messages={messages}
        onSubmit={onSubmit}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
      />
      <div className="sidebar flex-1/4-lg border h-screen of-y-a scrollbar">
        Side bar people info
        <Link to="/logout">Logout</Link>
      </div>
    </Container>
  );
};
