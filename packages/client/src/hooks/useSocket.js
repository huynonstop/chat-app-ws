import { useEffect, useState } from 'react';
import { socket as createSocketClient } from '../utils';

export default (setMessages) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log('create socket');
    const socket = createSocketClient();
    socket.on('connect', () => {
      setError(null);
    });
    socket.on('new-connect', ({ data, message }) => {
      const { count } = data;
      console.log(message, count);
    });
    socket.on('new-disconnect', ({ data, message }) => {
      const { count } = data;
      console.log(message, count);
    });
    socket.on('friend-connect', ({ data, message }) => {
      console.log(message);
    });
    socket.on('message-create', ({ data }) => {
      console.log('a message from you friend', data);
      setMessages(prevState => [...prevState, data]);
    });
    return () => {
      socket.close();
    };
  }, [setMessages]);

  return [{ error }];
};
