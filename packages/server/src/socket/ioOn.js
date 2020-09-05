import { addTyping, remTyping, membersTyping } from '../services/redis.js';
import Room from '../models/room.js';

export const ioConnect = (socket) => {
  const { userId } = socket;
  socket.on('join', async ({ roomId }, callback) => {
    const room = await Room.findOne({
      _id: roomId,
      'users.userId': userId,
    });
    if (!room) {
      callback('NOT_FOUND_ROOM');
    }
    socket.join(roomId);
    callback(null, room);
  });
  socket.on('leave', async ({ roomId }, callback) => {
    const room = await Room.findOne({
      _id: roomId,
      'users.userId': userId,
    });
    if (!room) {
      callback('NOT_FOUND_ROOM');
    }
    socket.broadcast.to(roomId).emit('room-disconnect', {
      data: userId,
    });
  });
  socket.on('typing', ({ roomId, stop }) => {
    let typingPromise = null;
    if (stop) {
      typingPromise = remTyping(roomId, userId);
    } else {
      typingPromise = addTyping(roomId, userId);
    }
    typingPromise
      .then(() => membersTyping(roomId))
      .then((res) => {
        socket.broadcast.to(roomId).emit('typing-user', {
          data: res,
        });
      })
      .catch((err) => console.log(err));
  });
};

export default {
  ioConnect,
};
