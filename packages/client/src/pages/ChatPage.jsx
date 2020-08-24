import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useSocket from '../hooks/useSocket';
import { api } from '../utils';
import ChatBox from '../components/ChatBox';
import Container from '../components/Container';
import { authState } from '../store/state';

export default () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(null);
  const { username } = useRecoilValue(authState);
  useSocket(setMessages);
  useEffect(() => {
    setLoadingMessage(true);
    const fetchMessage = async () => {
      try {
        const { data } = await api('message');
        setMessages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMessage(false);
      }
    };
    fetchMessage();
  }, [setMessages]);
  const onSubmit = async e => {
    e.preventDefault();
    if (!messageInput) return;
    const options = {
      method: 'POST',
      data: { message: messageInput, username },
    };
    setMessageInput('');
    try {
      await api('message', options);
    } catch (err) {
      console.log(err);
    }
  };
  if (loadingMessage === null) {
    return null;
  }
  return (
    <Container flex fluid className="page">
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        Side bar room chat
      </div>
      <ChatBox
        className="d-flex flex-1/2-md h-screen of-y-h"
        username={username}
        messages={messages}
        onSubmit={onSubmit}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        isLoading={loadingMessage}
      />
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        Side bar people info
      </div>
    </Container>
  );
};
