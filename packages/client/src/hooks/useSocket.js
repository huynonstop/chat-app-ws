import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import { api } from '../utils';

const ENDPOINT = process.env.REACT_APP_SOCKET;
localStorage.debug = 'socket.io-client:socket';

const useSocket = token => {
  const socketRef = useRef(null);
  useEffect(() => {
    console.log(token);
    if (!token) return () => {};
    if (socketRef.current) return () => {};
    socketRef.current = io(ENDPOINT, {
      transports: ['websocket'],
      upgrade: false,
      query: `token=${token}`,
      reconnectionAttempts: 5,
    });
    const socket = socketRef.current;
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [token]);

  return socketRef.current;
};
export default useSocket;

export const useChatSubscription = (token, username) => {
  const [messages, setMessages] = useState([]);
  const [errorSocket, setErrorSocket] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useSocket(token);
  useEffect(() => {
    if (!socket) return;
    const systemMessageHandler = ({ data, message }) => {
      setMessages(prevState => [
        ...prevState,
        {
          message,
          key: `system_${prevState.length}`,
          isSystem: true,
        },
      ]);
    };

    socket.on('new-connect', systemMessageHandler);
    socket.on('new-disconnect', systemMessageHandler);
    socket.on('friend-connect', ({ data, message }) => {
      console.log(message);
    });
    socket.on('message-create', ({ data }) => {
      setMessages(prevState => [...prevState, data]);
    });

    // socket.on('reconnect', attemptNumber => {
    //   console.log(attemptNumber);
    // });
    socket.on('connect_error', err => console.log('connect_error', err));
    socket.on('disconnect', reason => console.log(reason));
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('typing-user', ({ data }) => {
      setTypingUsers(data.filter(u => u !== username));
    });
  }, [socket, username]);

  useEffect(() => {
    if (!socket) return;
    const connectHandler = async () => {
      try {
        setErrorSocket(null);
        setLoadingMessage(true);
        const { data } = await api('message', { token });
        setMessages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMessage(false);
      }
    };
    socket.on('connect', connectHandler);
  }, [socket, token]);

  return {
    socket,
    messages,
    errorSocket,
    loadingMessage,
    typingUsers,
  };
};
