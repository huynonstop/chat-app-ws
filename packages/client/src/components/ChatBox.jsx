import React from 'react';
import { ReactComponent as Send } from '../svg/send.svg';

const Avatar = ({ src }) => (
  <div className="flex-0 avatar m">
    <img width={36} height={36} src={src} alt="avatar" />
  </div>
);

const ChatRow = ({ user, text }) => {
  let justify = '';
  let userClass = '';
  let avatar = (
    <Avatar src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/ICON-ICX-icon.png" />
  );
  if (user === 'h') {
    justify = 'justify-content-end';
    avatar = null;
    userClass = 'user';
  }
  return (
    <div className={`d-flex chat-row ${justify}`}>
      {avatar}
      <div className={`flex-0 text border rounded ${userClass}`}>{text}</div>
    </div>
  );
};

export default ({
  className, messages, onSubmit, messageInput, setMessageInput,
}) => {
  const chats = messages.map(({ user, text, key }) => (
    <ChatRow user={user} text={text} key={key} />
  ));
  return (
    <div className={`chat-box ${className}`}>
      <div className="header border">
        <div>
          <p>abc</p>
        </div>
      </div>
      <div className="d-flex body content-under-2-header scrollbar">
        {chats}
      </div>
      <form onSubmit={onSubmit} className="form-send d-flex font-2x">
        <div className="input-row d-flex flex-1">
          <input
            className="d-block flex-1 w-100"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            placeholder="Aa..."
          />
          <div className="flex-0">
            <button className="btn-send" type="submit">
              <Send />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
