import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SOCKET;
localStorage.debug = 'socket.io-client:socket';

const useSocket = token => {
  const socketRef = useRef(null);
  useEffect(() => {
    if (!token) return () => {};
    if (socketRef.current) return () => {};
    const socket = io(ENDPOINT, {
      transports: ['websocket'],
      upgrade: false,
      query: `token=${token}`,
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [token]);
  return socketRef.current;
};
export default useSocket;
