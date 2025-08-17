import { Router } from 'express';
import { messageController } from '../controllers/messageController';


const router = Router();

router.get('/', messageController.getElements);
router.post('/', messageController.createElement);
router.delete('/', messageController.deleteAll);

export default router;