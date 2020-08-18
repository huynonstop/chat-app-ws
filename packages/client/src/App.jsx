import React, { useEffect, useState } from 'react';
import api from './utils/api';
import ChatBox from './components/ChatBox';

const chatLogs = [
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h', text: 'abc1' },
  { user: 'h2', text: 'abc1' },
  { user: 'h', text: 'abc1' },
];

const App = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    api('test')
      .then(data => {
        console.log(data);
        setChats(chatLogs);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <ChatBox chatLogs={chats} />
    </div>
  );
};

export default App;
