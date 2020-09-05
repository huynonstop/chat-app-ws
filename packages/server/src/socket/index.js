import socketio from 'socket.io';
import jwt from 'jsonwebtoken';
import { ioConnect } from './ioOn.js';
import { JWT_SECRET } from '../config.js';

let io;
const getIO = () => {
  if (!io) throw new Error('No Socket.io');
  return io;
};

export default getIO;

export const init = (server) => {
  if (io) return io;
  io = socketio(server);
  io.use((socket, next) => {
    const { token } = socket.handshake.query || {};
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, { id: userId }) => {
        if (err) {
          return next(err);
        }
        socket.userId = userId;
        next();
      });
    } else {
      next(new Error('NO_AUTH'));
    }
  }).on('connect', ioConnect);
  return io;
};
