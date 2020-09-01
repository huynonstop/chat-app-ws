import { socketDisconnect, socketTyping } from './socketOn.js';

export const ioConnect = (socket) => {
  const username = socket.handshake.query.token;
  const message = `${username} has connected`;
  socket.broadcast.emit('new-connect', {
    message,
    data: {
      username,
    },
  });
  socket.on('disconnect', socketDisconnect(socket, username));
  socket.on('typing', socketTyping(socket));
};

export default {
  ioConnect,
};
