import { useState, useRef } from 'react';

export default (sendMessage, roomId) => {
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  // const timeout = useRef(null);
  const onSubmit = async e => {
    e.preventDefault();
    if (!messageInput) return;
    setLoading(true);
    try {
      sendMessage(messageInput, roomId);
      // if (timeout.current) clearTimeout(timeout.current);
      // socket.emit('typing', { roomId, stop: true });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setMessageInput('');
    }
  };
  const onChangeMessage = e => {
    setMessageInput(e.target.value);
    // if (e.key !== 'Enter') {
    //   if (timeout.current) {
    //     clearTimeout(timeout.current);
    //   } else {
    //     socket.emit('typing', { roomId });
    //   }

    //   timeout.current = setTimeout(() => {
    //     socket.emit('typing', { roomId, stop: true });
    //     timeout.current = null;
    //   }, 3000);
    // }
  };
  return {
    messageInput,
    loading,
    onChangeMessage,
    onSubmit,
  };
};
