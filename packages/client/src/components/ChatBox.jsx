import React from 'react';
import { useChatSubscription } from '../hooks/useSocket';
import useMessageInput from '../hooks/useMessageInput';
import useScrollToView from '../hooks/useScrollToView';
import { ReactComponent as Send } from '../svg/send.svg';
import { ReactComponent as Spinner } from '../svg/loading-spinner.svg';
import AvatarWithText from './AvatarWithText';

export default ({
  className, roomId, token, userId, username, inviteCode,
}) => {
  const {
    socket, messages, loadingMessage, typingUsers,
  } = useChatSubscription(
    token,
    roomId,
    userId,
  );
  const {
    loading,
    messageInput,
    setMessageInput,
    onSubmit,
    onKeyNotEnter,
  } = useMessageInput(socket, token, roomId);
  const chats = messages.map(
    (
      {
        message, _id, userId: chatUserId, isSystem,
      },
      index,
    ) => (isSystem ? (
      <SystemRow text={message} key={_id} />
    ) : (
      <ChatRow
        key={_id}
        isUser={chatUserId === userId}
        user={chatUserId}
        text={message}
        endText={
            messages[index + 1] ? messages[index + 1].userId !== userId : true
          }
        beginText={index ? messages[index - 1].userId !== userId : true}
      />
    )),
  );
  return (
    <div className={`chat-box ${className}`}>
      <div className="header bg-sidebar">
        <div className="d-flex p-1 justify-content-between">
          <AvatarWithText
            className="d-flex h-100 flex-1 align-items-center font-2x"
            src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png"
            avatarClass="mr-1"
          >
            <p className="m-0 text-white">
              {username}
              #
              {inviteCode}
            </p>
          </AvatarWithText>
        </div>
      </div>
      <div className="d-flex body content-under-2-header scrollbar align-content-start">
        <div className="d-flex chat-row justify-content-center">
          {loadingMessage && <Spinner />}
        </div>
        {chats}
        <TypingRows typingUsers={typingUsers} />
      </div>
      <form onSubmit={onSubmit} className="form-send d-flex">
        <div className="send-row bg-sidebar d-flex flex-1 align-items-center">
          <input
            className="d-block flex-1 w-100"
            value={messageInput}
            onChange={e => {
              setMessageInput(e.target.value);
              onKeyNotEnter(e);
            }}
            placeholder="Aa..."
            required
          />
          {loading ? (
            <Spinner className="spinner white" />
          ) : (
            <button
              style={{ padding: '1.5rem' }}
              className="flex-0 max-3/2 btn-send bg-icon-send icon-circle border-sub"
              type="submit"
              disabled={messageInput === ''}
            >
              <Send className="absolute-center-xy" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const ChatRow = ({
  user,
  text,
  beginText = true,
  endText = true,
  isUser,
  children,
}) => {
  const chatRowRef = useScrollToView();
  const textClass = `flex-0 text ml-2 ${isUser ? 'user' : ''} ${
    beginText ? 'top' : ''
  } ${endText ? 'bottom' : ''}`;
  const imageSrc = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png';
  const avatarWithUserName = beginText && !isUser ? (
    <AvatarWithText
      className="d-flex"
      src={imageSrc}
      avatarClass="avatar-1/2"
    >
      <span className="ml-1/4 pl-1/2 text-main">{user}</span>
    </AvatarWithText>
  ) : null;
  return (
    <div className="d-flex chat-row flex-column" ref={chatRowRef}>
      {avatarWithUserName}
      <div className={textClass}>
        {text && <span>{text}</span>}
        {children}
      </div>
    </div>
  );
};

const SystemRow = ({ text }) => {
  const chatRowRef = useScrollToView();
  return (
    <div className="chat-row text-center" ref={chatRowRef}>
      <span>{text}</span>
    </div>
  );
};

const TypingRows = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;
  return typingUsers.map(u => (
    <ChatRow key={u} user={u}>
      <div className="typing-indicator">
        <span />
        <span />
        <span />
      </div>
    </ChatRow>
  ));
};
