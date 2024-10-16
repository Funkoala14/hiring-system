import { Router } from 'express';
import {login, logout} from '../controllers/UserController.js';

const userRouter = Router();

// User login route
userRouter.post('/login', loginUserValidation, login);

// User logout route
userRouter.get('/logout', logout);

export default userRouter;
