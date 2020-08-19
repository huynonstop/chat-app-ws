import express from 'express';
import { port, mode } from '../config.js';
import { countIO } from '../socket/index.js';

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
export default router;
