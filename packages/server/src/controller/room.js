import Room from '../models/room.js';
import User from '../models/user.js';

const getRooms = async (req, res, next) => {
  try {
    const { userId } = req;
    const rooms = await Room.find({
      'users.user': userId,
    });
    res.status(200).json({
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const { userId } = req;
    const { roomId } = req.params;
    const room = await Room.findOne({
      _id: roomId,
      'users.user': userId,
    });
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

const newGroup = async (req, res, next) => {
  try {
    const { userId } = req;
    const room = await Room.create({
      users: [{ userId }],
      chats: [],
      type: 'GROUP',
    });
    return res.json({
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

const findOrCreatePrivate = async (req, res, next) => {
  try {
    const { userId } = req;
    const { inviteCode } = req.params;
    const user = await User.findOne({
      inviteCode,
    });
    if (!user) {
      return res.status(400).json({
        error: 'NOT_FOUND_FRIEND',
      });
    }
    let room;
    room = await Room.findOne({
      'users.user': {
        $all: [userId, user._id],
      },
      type: 'PRIVATE',
    });
    if (!room) {
      room = await Room.create({
        users: [{ userId }, { userId: user._id }],
        chats: [],
        type: 'PRIVATE',
      });
    }
    res.json({
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

const adddToGroup = async (req, res, next) => {
  try {
    const { userId } = req;
    const { roomId } = req.params;
    const { inviteCode } = req.query;
    const user = await User.findOne({
      inviteCode,
    });
    if (!user) {
      return res.status(400).json({
        error: 'NOT_FOUND_FRIEND',
      });
    }
    const room = await Room.findOne({
      _id: roomId,
      'users.user': userId,
      type: 'GROUP',
    });
    if (!room) {
      return res.status(400).json({
        error: 'NOT_FOUND_ROOM',
      });
    }
    if (!room.users.some((u) => u.userId === user._id)) {
      room.users.push({
        userId: user._id,
      });
      await room.save();
      return res.json({
        data: room,
      });
    }
    res.status(400).json({
      error: 'USER_EXIST',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getRoom,
  getRooms,
  newGroup,
  findOrCreatePrivate,
  adddToGroup,
};
