import mongoose from 'mongoose';
import { ping } from './services/redis.js';
import { init } from './socket/index.js';
import app from './app.js';
import { port, DATABASE_URL } from './config.js';

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
