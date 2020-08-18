import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';

import { port } from './env.js';
import { countIO } from './io.js';

const publicDirPath = path.join(path.resolve(), '../public');

const app = express();

app.use(express.static(publicDirPath));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
if (app.get('env') === 'development') {
  app.use(morgan('combined'));
}
app.use(helmet());

app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'Success',
    mode: app.get('env'),
    version: process.version,
    port,
    currentIO: countIO.count(),
  });
});
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
  });
});

export default app;
