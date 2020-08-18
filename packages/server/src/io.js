import socketio from 'socket.io';

let io;
let count = 0;
export const init = (server) => {
  if (!io) io = socketio(server);
  return io;
};

export default () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};
export const countIO = {
  count: () => count,
  addCount: () => {
    count += 1;
    return count;
  },
  removeCount: () => {
    count -= 1;
    return count;
  },
};
