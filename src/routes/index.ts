import { Router } from 'express';
import projectRoutes from './projects';
import userRoutes from './users';
import imageRoutes from './images';
import messageRoutes from './messages';
import processRoutes from './processes';

const router = Router();

/*router.use('/users', userRoutes);
router.use('/images', imageRoutes);
router.use('/projects', projectRoutes);*/
router.use('/messages', messageRoutes);
router.use('/process', processRoutes);

export default router;