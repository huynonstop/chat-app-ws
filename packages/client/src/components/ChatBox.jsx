import React from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Send } from '../svg/send.svg';
import { ReactComponent as Logout } from '../svg/logout.svg';

const Avatar = ({ src, className = '', imgClassName = '' }) => (
  <div className={`avatar ${className}`}>
    <img className={imgClassName} src={src} alt="avatar" />
  </div>
);

const ChatRow = ({ user, text }) => {
  let justify = '';
  let userClass = '';
  let avatar = (
    <Avatar className="mr-1/2 avatar-3/4" src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png" />
  );
  if (user === 'h') {
    justify = 'justify-content-end';
    avatar = null;
    userClass = 'user';
  }
  return (
    <div className={`d-flex chat-row ${justify}`}>
      {avatar}
      <div className={`flex-0 text border ${userClass}`}>{text}</div>
    </div>
  );
};

export default ({
  className,
  messages,
  onSubmit,
  messageInput,
  setMessageInput,
}) => {
  const chats = messages.map(({ user, text, key }) => (
    <ChatRow user={user} text={text} key={key} />
  ));
  return (
    <div className={`chat-box ${className}`}>
      <div className="header border">
        <div className="d-flex pxy-1/2-1 justify-content-between">
          <div className="d-flex h-100 flex-1 align-items-center font-2x">
            <Avatar className="mr-1" src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png" />
            <p className="m-0">user</p>
          </div>
          <Link to="/logout" className="icon-circle bg-icon p-2 border-sub">
            <Logout className="s-icon absolute-center-xy" />
          </Link>
        </div>
      </div>
      <div className="d-flex body content-under-2-header scrollbar">
        {chats}
      </div>
      <form onSubmit={onSubmit} className="form-send d-flex font-2x">
        <div className="send-row d-flex flex-1">
          <input
            className="d-block flex-1 w-100"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder="Aa..."
          />
          <div className="flex-0">
            <button className="btn-send bg-icon-send icon-circle p-2 border-sub" type="submit">
              <Send className="s-icon-3/2 absolute-center-xy" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
