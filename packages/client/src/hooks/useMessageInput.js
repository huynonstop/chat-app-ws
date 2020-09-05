import { useState, useRef } from 'react';
import { api } from '../utils';

export default (socket, token, roomId) => {
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const timeout = useRef(null);
  const onSubmit = async e => {
    e.preventDefault();
    if (!messageInput) return;
    const options = {
      method: 'POST',
      token,
      data: { message: messageInput, roomId },
    };
    setMessageInput('');
    setLoading(true);
    try {
      await api('message', options);
      if (timeout.current) clearTimeout(timeout.current);
      socket.emit('typing', { roomId, stop: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const onKeyNotEnter = e => {
    if (e.key !== 'Enter') {
      if (timeout.current) {
        clearTimeout(timeout.current);
      } else {
        socket.emit('typing', { roomId });
      }

      timeout.current = setTimeout(() => {
        socket.emit('typing', { roomId, stop: true });
        timeout.current = null;
      }, 3000);
    }
  };

  return {
    messageInput,
    setMessageInput,
    loading,
    onSubmit,
    onKeyNotEnter,
  };
};
