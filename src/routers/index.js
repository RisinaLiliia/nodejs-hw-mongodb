
import { Router } from 'express';
import contactsRouter from './contactsRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
