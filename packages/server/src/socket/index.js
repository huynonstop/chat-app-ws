import socketio from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { addTyping, remTyping, membersTyping } from '../services/redis.js';
import Room from '../models/room.js';
import Chat from '../models/chat.js';
import User from '../models/user.js';

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
  }).on('connect', (socket) => {
    const { userId } = socket;
    socket.on('rooms-fetch', async (data, callback) => {
      const rooms = await Room.find({
        'users.user': userId,
      }).populate('users.user');
      callback(rooms);
    });
    socket.on('join-room', (roomId, callback) => {
      Room.findOne({
        _id: roomId,
        'users.user': userId,
      })
        .then((room) => {
          if (!room) throw new Error('NOT_FOUND_ROOM');
          socket.leave(Object.keys(socket.rooms)[1]);
          socket.join(roomId);
          return Chat.find({
            roomId,
          });
        })
        .then((chats) => {
          socket.emit('fetch-message', { chats, roomId });
        })
        .catch((err) => {
          callback(err);
        });

      // socket.emit('room-connect', room);
    });
    socket.on('send-message', async ({ message, roomId }, callback) => {
      try {
        const room = await Room.findOne({
          _id: roomId,
          'users.user': userId,
        });
        if (!room) throw new Error('NOT_FOUND_ROOM');
        const chat = new Chat({ message, userId, roomId });
        await chat.save();
        if (!chat) throw new Error('NOT_CREATE_CHAT');
        io.to(roomId).emit('new-message', { chat });
      } catch (err) {
        callback(err);
      }
    });
    socket.on('leave', async ({ roomId }, callback) => {
      const room = await Room.findOne({
        _id: roomId,
        'users.user': userId,
      });
      if (!room) {
        callback('NOT_FOUND_ROOM');
      }
      socket.leave(roomId);
      socket.broadcast.to(roomId).emit('room-disconnect', {
        data: userId,
      });
    });
    socket.on('new-group', async (data, callback) => {
      try {
        const room = await Room.create({
          users: [{ user: userId }],
          type: 'GROUP',
        });
        callback(null, room);
      } catch (err) {
        callback(err);
      }
    });
    socket.on('find-friend-code', async ({ inviteCode }, callback) => {
      try {
        const user = await User.findOne({
          inviteCode,
        });
        if (!user) {
          throw new Error('NOT_FOUND_FRIEND');
        }
        let room;
        room = await Room.findOne({
          'users.user': {
            $all: [user, user._id],
          },
          type: 'PRIVATE',
        });
        if (!room) {
          room = await Room.create({
            users: [{ user: userId }, { user: user._id }],
            type: 'PRIVATE',
          });
        }
        callback(null, room);
      } catch (err) {
        callback(err);
      }
    });
    socket.on('add-to-group', async ({ roomId, inviteCode }, callback) => {
      try {
        const user = await User.findOne({
          inviteCode,
        });
        if (!user) {
          throw new Error('NOT_FOUND_FRIEND');
        }
        const room = await Room.findOne({
          _id: roomId,
          'users.user': userId,
          type: 'GROUP',
        });
        if (!room) {
          throw new Error('NOT_FOUND_ROOM');
        }
        if (!room.users.some((u) => u.user === user._id)) {
          room.users.push({
            user: user._id,
          });
          await room.save();
          callback(null, room);
        }
        throw new Error('USER_EXISTS');
      } catch (err) {
        console.log(err);
        callback(err);
      }
    });
  });
  return io;
};
