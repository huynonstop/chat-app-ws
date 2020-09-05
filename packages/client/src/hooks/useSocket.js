import { useEffect, useState, useRef } from 'react';
import { navigate } from '@reach/router';
import io from 'socket.io-client';

import { api } from '../utils';

const ENDPOINT = process.env.REACT_APP_SOCKET;
localStorage.debug = 'socket.io-client:socket';

const useSocket = token => {
  const socketRef = useRef(null);
  useEffect(() => {
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
      console.log('disconnect');
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [token]);
  return socketRef.current;
};
export default useSocket;

export const useChatSubscription = (token, roomId, userId) => {
  const [messages, setMessages] = useState([]);
  const [errorSocket, setErrorSocket] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const socket = useSocket(token);

  useEffect(() => {
    if (!socket) return;
    socket.on('room-message-create', ({ data }) => {
      setMessages(prevState => [...prevState, data]);
    });

    // socket.on('reconnect', attemptNumber => {
    //   console.log(attemptNumber);
    // });
    socket.on('connect_error', err => console.log('connect_error', err));
  }, [socket]);

  useEffect(() => {
    if (!socket) return () => {};
    const connectHandler = async (room) => {
      try {
        setErrorSocket(null);
        setLoadingMessage(true);
        const { data } = await api(`message?roomId=${room._id}`, { token });
        setMessages(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMessage(false);
      }
    };
    socket.emit('join', { roomId }, (err, room) => {
      if (err) {
        console.log(err);
        navigate('/');
      } else {
        connectHandler(room);
      }
    });
    return () => {
      socket.emit('leave', { roomId }, err => {
        console.log(err);
      });
    };
  }, [socket, roomId, token]);

  useEffect(() => {
    if (!socket) return;
    socket.on('typing-user', ({ data }) => {
      setTypingUsers(data.filter(u => u !== userId));
    });
  }, [socket, userId]);

  return {
    socket,
    messages,
    errorSocket,
    loadingMessage,
    typingUsers,
  };
};
