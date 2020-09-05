import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import { useRecoilValue } from 'recoil';
import ChatBox from '../components/ChatBox';
import StartBox from '../components/StartBox';
import Container from '../components/Container';
import RoomsSidebar from '../components/RoomsSidebar';
import { authState } from '../store/state';
import { ReactComponent as Logout } from '../svg/logout.svg';

const ChatPage = () => {
  const [rooms, setRooms] = useState([]);
  const {
    username, token, inviteCode, userId,
  } = useRecoilValue(authState);
  return (
    <Container flex fluid className="page">
      <RoomsSidebar rooms={rooms} token={token} setRooms={setRooms} />
      <Router className="d-flex flex-1/2-md box-shadow">
        <ChatBox
          path=":roomId"
          className="d-flex flex-1 h-screen of-y-h"
          username={username}
          inviteCode={inviteCode}
          token={token}
          userId={userId}
        />
        <StartBox
          path="/"
          className="d-flex flex-1 justify-content-center flex-column align-items-center h-screen"
          username={username}
          inviteCode={inviteCode}
          token={token}
          setRooms={setRooms}
        />
      </Router>
      <div className="sidebar flex-1/4-lg h-screen of-y-a scrollbar">
        Side bar people info
      </div>

      <Link to="/logout" className="logout box-shadow icon-circle s-icon p-2">
        <Logout className="s-icon absolute-center-xy" />
      </Link>
    </Container>
  );
};

export default React.memo(ChatPage);
