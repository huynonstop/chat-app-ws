import express from 'express';
import { port, mode } from '../config.js';
import countIO from '../socket/countIO.js';
import messageRoute from './message.js';

const router = express.Router();
router.get('/test', (req, res) => {
  res.status(200).json({
    message: 'Success',
    mode,
    version: process.version,
    port,
    currentIO: countIO.count(),
  });
});
router.use('/message', messageRoute);
export default router;
