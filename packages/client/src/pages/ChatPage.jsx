import React, { useState } from 'react';

import { useChatSubscription } from '../hooks/useSocket';
import { api } from '../utils';
import ChatBox from '../components/ChatBox';
import Container from '../components/Container';

const ChatPage = () => {
  const [messageInput, setMessageInput] = useState('');
  const [loadingMessageInput, setLoadingMessageInput] = useState(false);
  const { username, messages, loadingMessage } = useChatSubscription();

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
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMessageInput(false);
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
      />
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        Side bar people info
      </div>
    </Container>
  );
};

export default React.memo(ChatPage);
