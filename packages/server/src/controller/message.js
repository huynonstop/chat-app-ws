import io from '../socket/index.js';

const chatLogs = [
  {
    username: 'h33',
    message: 'abc1asdasjdjasdjas\njdas',
  },
  { username: 'h32', message: 'abc1' },
  { username: 'h32', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h2', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h2', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h', message: 'abc1' },
  { username: 'h2', message: 'abc1' },
];

const postMessage = (req, res, next) => {
  try {
    const { message, username } = req.body;
    const data = { message, username, key: chatLogs.length };
    chatLogs.push(data);
    io().emit('message-create', {
      message: 'message-create',
      data,
    });
    res.status(200).json({
      message: 'message-create',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getMessage = (req, res, next) => {
  try {
    const username = req.get('Authorization').split(' ')[1];
    res.status(200).json({
      message: `${username} get`,
      data: chatLogs.map((text, index) => ({ ...text, key: index })),
    });
  } catch (err) {
    next(err);
  }
};

export default {
  postMessage,
  getMessage,
};
