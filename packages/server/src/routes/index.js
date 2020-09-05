import express from 'express';
import apiRouter from './api.js';
import authRouter from './auth.js';
import verifyUser from '../middleware/verifyUser.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running.' });
});
router.use('/', authRouter);
router.use('/api', verifyUser, apiRouter);

export default router;
