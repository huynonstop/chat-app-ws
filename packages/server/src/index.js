import { init } from './socket/index.js';
import app from './app.js';
import { port } from './config.js';

const server = app.listen(port, () => {
  console.log('Database connected!');
  console.log('Redis connected!');
  console.log(`Server is listening on port ${port}!`);
});

init(server);
