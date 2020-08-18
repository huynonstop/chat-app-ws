import React from 'react';
import { RecoilRoot } from 'recoil';
import ChatBox from './components/ChatBox';

const App = () => (
  <RecoilRoot>
    <div className="App">
      <ChatBox />
    </div>
  </RecoilRoot>
);

export default App;
