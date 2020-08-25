import countIO from './countIO.js';

export const socketDisconnect = (socket, username) => (reason) => {
  const message = `${username} has disconnected`;
  socket.broadcast.emit('new-disconnect', {
    message,
    reason,
    data: {
      username,
    },
  });
  console.log(message, countIO.removeCount());
  console.log(reason);
};
export default {
  socketDisconnect,
};
