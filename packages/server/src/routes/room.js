import express from 'express';
import roomController from '../controller/room.js';

const router = express.Router();

router.get('/', roomController.getRooms);
router.get('/:roomId', roomController.getRoom);
router.post('/', roomController.newGroup);
router.post('/u/:inviteCode', roomController.findOrCreatePrivate);
router.patch('/:roomId', roomController.adddToGroup);
export default router;
