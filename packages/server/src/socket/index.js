import socketio from 'socket.io';

let io;
let count = 0;
const getIO = () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};

export default getIO;

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

export const init = (server) => {
  if (io) return io;
  io = socketio(server);
  io.on('connection', (socket) => {
    let message = 'A new client connected';
    socket.broadcast.emit('new-connect', {
      message,
      data: {
        count: countIO.addCount(),
      },
    });
    console.log(message, count);
    socket.on('disconnect', () => {
      message = 'A new client disconnected';
      socket.broadcast.emit('new-disconnect', {
        message: 'A new client disconnected',
        data: {
          count: countIO.removeCount(),
        },
      });
      console.log(message, count);
    });
  });
  return io;
};
