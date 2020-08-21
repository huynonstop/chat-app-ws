import socketio from 'socket.io';

let io;
let count = 0;
const getIO = () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};

export default getIO;

export const countIO = {
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
    io.emit('countConnect-update', {
      message,
      data: countIO.addCount(),
    });
    console.log(message, count);
    socket.on('disconnect', () => {
      message = 'A new client disconnected';
      io.emit('countConnect-update', {
        message: 'A new client disconnected',
        data: countIO.removeCount(),
      });
      console.log(message);
    });
  });
  return io;
};
