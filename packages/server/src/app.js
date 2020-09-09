import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import { mode } from './config.js';
import router from './routes/index.js';

const publicDirPath = path.join(path.resolve(), '../public');

const app = express();

app.use(express.static(publicDirPath));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
if (mode === 'development') {
  app.use(morgan('combined'));
}
app.use(helmet());

app.use(router);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
  });
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
  });
});

export default app;
