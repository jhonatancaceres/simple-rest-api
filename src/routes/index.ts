import { Router } from 'express';
import projectRoutes from './projects';
import userRoutes from './users';
import imageRoutes from './images';

const router = Router();

router.use('/users', userRoutes);
router.use('/images', imageRoutes);
router.use('/projects', projectRoutes);

export default router;