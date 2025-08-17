import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

router.get('/', userController.getElements);
router.post('/', userController.createElement);
router.get('/:id', userController.getElementById);
router.put('/:id', userController.updateElement);
router.delete('/:id', userController.deleteElement);

export default router;