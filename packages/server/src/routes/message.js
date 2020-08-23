import express from 'express';
import messageController from '../controller/message.js';

const router = express.Router();

router.post('/', messageController.postMessage);

router.get('/', messageController.getMessage);
export default router;
