import React, { useRef, useEffect } from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Send } from '../svg/send.svg';
import { ReactComponent as Logout } from '../svg/logout.svg';
import { ReactComponent as Spinner } from '../svg/loading-spinner.svg';

const Avatar = ({
  children, src, className = '', imgClassName = '',
}) => (
  <>
    <div className={`avatar ${className} d-inline-block`}>
      <img className={imgClassName} src={src} alt="avatar" />
    </div>
    {children}
  </>
);

const ChatRow = ({
  user, text, beginText = true, endText = true, isUser,
}) => {
  const chatRowRef = useRef(null);
  const userClass = isUser ? 'user' : '';
  const avatarOnText = beginText && !isUser ? (
    <div className="d-flex">
      <Avatar
        className="avatar-1/2"
        src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png"
      >
        <span className="ml-1/4 pl-1/2 text-main">{user}</span>
      </Avatar>
    </div>
  ) : null;
  useEffect(() => {
    chatRowRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className="d-flex chat-row flex-column" ref={chatRowRef}>
      {avatarOnText}
      <div
        className={`flex-0 text ml-2 ${userClass} ${beginText ? 'top' : ''} ${
          endText ? 'bottom' : ''
        }`}
      >
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ({
  username: user,
  className,
  messages,
  onSubmit,
  messageInput,
  setMessageInput,
  isLoading,
}) => {
  const chats = messages.map(({ username, message, key }, index) => (
    <ChatRow
      isUser={username === user}
      user={username}
      text={message}
      key={key}
      endText={messages[index + 1] ? messages[index + 1].username !== username : true}
      beginText={index ? messages[index - 1].username !== username : true}
    />
  ));
  return (
    <div className={`chat-box ${className}`}>
      <div className="header bg-sidebar">
        <div className="d-flex p-1 justify-content-between">
          <div className="d-flex h-100 flex-1 align-items-center font-2x">
            <Avatar
              className="mr-1"
              src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png"
            >
              <p className="m-0 text-white">user</p>
            </Avatar>
          </div>
          <Link to="/logout" className="icon-circle s-icon bg-icon p-2">
            <Logout className="s-icon absolute-center-xy" />
          </Link>
        </div>
      </div>
      <div className="d-flex body content-under-2-header scrollbar">
        <div className="d-flex chat-row justify-content-center">
          {isLoading && <Spinner />}
        </div>
        {chats}
      </div>
      <form onSubmit={onSubmit} className="form-send d-flex">
        <div className="send-row bg-sidebar d-flex flex-1 align-items-center">
          <input
            className="d-block flex-1 w-100"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder="Aa..."
          />
          <button
            className="flex-0 btn-send bg-icon-send icon-circle p-2 border-sub"
            type="submit"
          >
            <Send className="s-icon-3/2 absolute-center-xy" />
          </button>
        </div>
      </form>
    </div>
  );
};
