import React, { useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { authState } from '../store/state';
import { useChatSubscription } from '../hooks/useSocket';
import { api } from '../utils';
import ChatBox from '../components/ChatBox';
import Container from '../components/Container';

const ChatPage = () => {
  const { username, token } = useRecoilValue(authState);
  const [messageInput, setMessageInput] = useState('');
  const [loadingMessageInput, setLoadingMessageInput] = useState(false);
  const {
    socket, messages, loadingMessage, typingUsers,
  } = useChatSubscription(token, username);
  const timeout = useRef(null);
  const onSubmit = async e => {
    e.preventDefault();
    if (!messageInput) return;
    const options = {
      method: 'POST',
      data: { message: messageInput, username },
    };
    setMessageInput('');
    setLoadingMessageInput(true);
    try {
      await api('message', options);
      if (timeout.current) clearTimeout(timeout.current);
      socket.emit('typing', { username, stop: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMessageInput(false);
    }
  };
  const onKeyNotEnter = e => {
    if (e.key !== 'Enter') {
      if (timeout.current) {
        clearTimeout(timeout.current);
      } else {
        socket.emit('typing', { username });
      }

      timeout.current = setTimeout(() => {
        socket.emit('typing', { username, stop: true });
        timeout.current = null;
      }, 3000);
    }
  };
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
        loadingMessage={loadingMessage}
        loadingMessageInput={loadingMessageInput}
        onKeyNotEnter={onKeyNotEnter}
        typingUsers={typingUsers}
      />
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        Side bar people info
      </div>
    </Container>
  );
};

export default React.memo(ChatPage);
