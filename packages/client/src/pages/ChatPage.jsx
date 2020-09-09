import React, { useRef } from 'react';
import {
  Router, Link, Redirect, useMatch,
} from '@reach/router';
import { useRecoilValue } from 'recoil';
import ChatBox from '../components/ChatBox';
import StartBox from '../components/StartBox';
import Container from '../components/Container';
import RoomsSidebar from '../components/RoomsSidebar';
import { authState } from '../store/state';
import { ReactComponent as Logout } from '../svg/logout.svg';
import useChat from '../hooks/useChat';

const ChatPage = () => {
  const {
    username, token, inviteCode, userId,
  } = useRecoilValue(authState);
  const {
    socket,
    state,
    joinRoom,
    sendMessage,
    newGroup,
    findFriend,
    addFriendToGroup,
  } = useChat(token, userId);
  const addRef = useRef(null);
  const onSubmit = e => {
    e.preventDefault();
    addFriendToGroup(matchRoomId.roomId, addRef.current.value);
    addRef.current.value = '';
  };
  const matchRoomId = useMatch(':roomId');
  return (
    <Container flex fluid className="page">
      <RoomsSidebar rooms={state} />
      <Router className="d-flex flex-1/2-md box-shadow">
        <ChatBox
          path=":roomId"
          className="d-flex flex-1 h-screen of-y-h"
          username={username}
          inviteCode={inviteCode}
          token={token}
          userId={userId}
          joinRoom={joinRoom}
          sendMessage={sendMessage}
          rooms={state}
        />
        <StartBox
          path="/"
          className="d-flex flex-1 justify-content-center flex-column align-items-center h-screen"
          username={username}
          inviteCode={inviteCode}
          token={token}
          newGroup={newGroup}
          findFriend={findFriend}
        />
        <Redirect from="/*" to="/" noThrow />
      </Router>
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        <p>Side bar people info</p>
        {matchRoomId && state[matchRoomId.roomId] && state[matchRoomId.roomId].type === 'GROUP' && (
          <form key={1} className="search-row" onSubmit={onSubmit}>
            <input ref={addRef} placeholder="Friend code ..." />
            <button style={{ display: 'none' }} type="submit">
              hidden
            </button>
          </form>
        )}
      </div>

      <Link to="/logout" className="logout box-shadow icon-circle s-icon p-2">
        <Logout className="s-icon absolute-center-xy" />
      </Link>
    </Container>
  );
};

export default React.memo(ChatPage);
