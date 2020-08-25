import countIO from './countIO.js';
import { socketDisconnect } from './socketOn.js';

export const ioConnect = (socket) => {
  const username = socket.handshake.query.token;
  const message = `${username} has connected`;
  socket.broadcast.emit('new-connect', {
    message,
    data: {
      username,
    },
  });
  console.log(message, countIO.addCount());
  socket.on('disconnect', socketDisconnect(socket, username));
};

export default {
  ioConnect,
};
