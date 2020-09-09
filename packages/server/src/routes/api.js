import express from 'express';
import { port, mode } from '../config.js';
import messageRoute from './message.js';
import roomRoute from './room.js';

const router = express.Router();
router.get('/test', (req, res) => {
  res.status(200).json({
    message: 'Success',
    mode,
    version: process.version,
    port,
  });
});
router.use('/message', messageRoute);
router.use('/room', roomRoute);
export default router;
