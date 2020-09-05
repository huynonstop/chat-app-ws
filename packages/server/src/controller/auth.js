import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Room from '../models/room.js';
import { JWT_SECRET } from '../config.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [
        { username },
        { password },
      ],
    });
    if (!user) {
      return res.status(401).json({
        error: 'AUTH_ERROR',
      });
    }
    const { _id, inviteCode } = user;
    const token = jwt.sign(
      { id: _id },
      JWT_SECRET,
    );
    res.json({
      token,
      id: _id,
      username,
      inviteCode,
    });
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    console.log(username, password);
    const oldUser = await User.findOne({
      $or: [
        { username },
        { email },
      ],
    });
    if (oldUser?.username === username) {
      return res.status(401).json({
        error: 'DUP_USERNAME',
      });
    }
    if (oldUser?.email === email) {
      return res.status(401).json({
        error: 'DUP_EMAIL',
      });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    const rooms = new Room({
      users: [
        {
          userId: user._id,
          chats: [],
          type: 'DEFAULT',
        },
      ],
      chats: [],
      type: 'DEFAULT',
    });
    await rooms.save();
    res.json({
      username,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
