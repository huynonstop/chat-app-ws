import express from 'express';
import apiRouter from './api.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running.' });
});

router.use('/api', apiRouter);

export default router;
