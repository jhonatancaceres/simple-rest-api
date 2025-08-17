import { Router } from 'express';
import { projectController } from '../controllers/projectController';


const router = Router();

router.get('/', projectController.getElements);
router.post('/', projectController.createElement);
router.get('/:id', projectController.getElementById);
//router.put('/:id', projectController.updateElement);
//router.delete('/:id', projectController.deleteElement);

export default router;