import io from '../socket/index.js';
import Chat from '../models/chat.js';
import Room from '../models/room.js';

const postMessage = async (req, res, next) => {
  try {
    const { userId } = req;
    const { message, roomId } = req.body;
    const room = await Room.findOne({
      _id: roomId,
      'users.userId': userId,
    });
    if (!room) {
      return res.status(400).json({
        error: 'NOT_FOUND_ROOM',
      });
    }

    const chat = new Chat({ message, userId, roomId: room._id });
    await chat.save();
    io().to(roomId).emit('room-message-create', {
      data: chat,
    });
    res.status(200).json({
      data: chat,
    });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { userId } = req;
    const { roomId } = req.query;
    const room = await Room.findOne({
      _id: roomId,
      'users.userId': userId,
    });
    if (!room) {
      return res.status(400).json({
        error: 'NOT_FOUND_ROOM',
      });
    }
    const chats = await Chat.find({
      roomId,
    });
    res.status(200).json({
      data: chats,
    });
  } catch (err) {
    next(err);
  }
};
export default {
  postMessage,
  getMessages,
};
