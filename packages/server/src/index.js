import mongoose from 'mongoose';
import { ping } from './services/redis.js';
import { init } from './socket/index.js';
import app from './app.js';
import { port, DATABASE_URL } from './config.js';

// import User from './models/user.js';
// import Room from './models/room.js';

// function seed() {
//   const user1 = new User({
//     username: 'admin1',
//     email: 'huynonstop123tn@gmail.com',
//     password: '12345678ad',
//     rooms: [],
//   });
//   const user2 = new User({
//     username: 'admin1',
//     email: 'huynonstop123tn@gmail.com',
//     password: '12345678ad',
//     rooms: [],
//   });
//   const room1 = new Room({
//     users: [],
//     chats: [],
//   });
//   user1.save();
//   user2.save();
//   room1.save();
// }

mongoose
  .connect(DATABASE_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected!');
    return ping();
  })
  .then(() => {
    console.log('Redis connected!');
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}!`);
    });
    init(server);
  })
  .catch((err) => {
    console.log(err);
  });
