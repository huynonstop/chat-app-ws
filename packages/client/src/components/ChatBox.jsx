import React from 'react';

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
          />
          <div className="flex-0">
            <button className="btn-send" type="submit">
              <svg height="40px" width="40px" viewBox="0 0 40 40">
                <path
                  id="send"
                  d="M31.1059281,19.4468693 L10.3449666,29.8224462 C8.94594087,30.5217547 7.49043432,29.0215929 8.17420251,27.6529892 C8.17420251,27.6529892 10.7473302,22.456697 11.4550902,21.0955966 C12.1628503,19.7344961 12.9730756,19.4988922 20.4970248,18.5264632 C20.7754304,18.4904474 21.0033531,18.2803547 21.0033531,17.9997309 C21.0033531,17.7196073 20.7754304,17.5095146 20.4970248,17.4734988 C12.9730756,16.5010698 12.1628503,16.2654659 11.4550902,14.9043654 C10.7473302,13.5437652 8.17420251,8.34697281 8.17420251,8.34697281 C7.49043432,6.9788693 8.94594087,5.47820732 10.3449666,6.1775158 L31.1059281,16.553593 C32.298024,17.1488555 32.298024,18.8511065 31.1059281,19.4468693"
                  fill="#00b4d8"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
