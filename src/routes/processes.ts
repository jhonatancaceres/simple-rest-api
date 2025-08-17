import { Router } from 'express';
import { processController } from '../controllers/processController';


const router = Router();

router.get('/defaults', processController.getElements);
router.post('/setdefaults', processController.setDefaults);
router.post('/runproc', processController.createElement);


export default router;