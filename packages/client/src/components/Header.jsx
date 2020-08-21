import React from 'react';
import { useRecoilState } from 'recoil';
import { countIOState } from '../store/state';

const Header = () => {
  const [count] = useRecoilState(countIOState);
  return (
    <header>
      <p style={{ display: 'block', flex: '1 0 33%', textAlign: 'center' }}>{count || 'Waiting to connect'}</p>
    </header>
  );
};

export default Header;
