import socketio from 'socket.io';
import { ioConnect } from './ioOn.js';

let io;
const getIO = () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};

export default getIO;

export const init = (server) => {
  if (io) return io;
  io = socketio(server);
  io.on('connect', ioConnect);
  return io;
};
