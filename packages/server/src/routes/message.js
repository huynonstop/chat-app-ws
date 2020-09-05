import express from 'express';
import messageController from '../controller/message.js';

const router = express.Router();

router.post('/', messageController.postMessage);
router.get('/', messageController.getMessages);

export default router;
