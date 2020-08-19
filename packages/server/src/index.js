import { init, countIO } from './socket/index.js';
import app from './app.js';
import { port } from './config.js';

const server = app.listen(port, () => {
  console.log('Database connected!');
  console.log('Redis connected!');
  console.log(`Server is listening on port ${port}!`);
});

const io = init(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  countIO.addCount();
  socket.on('disconnect', () => {
    console.log('A client disconnected');
    countIO.removeCount();
  });
});
