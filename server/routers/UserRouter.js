import { Router } from 'express';
import { getUser } from '../controllers/UserController.js';

const userRouter = Router();

userRouter.get('', getUser);

export default userRouter;
