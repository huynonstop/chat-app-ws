import express from 'express';
import { port, mode } from '../config.js';
import io, { countIO } from '../socket/index.js';

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
router.post('/message', (req, res, next) => {
  try {
    const { message } = req.body;
    io().emit('message-create', { message });
    res.status(200).json({
      message,
    });
  } catch (err) {
    next(err);
  }
});
export default router;
