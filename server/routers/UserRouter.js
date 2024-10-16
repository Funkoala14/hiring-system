import { Router } from 'express';
import User from '../controllers/UserController.js';
const { login, logout } = User;
import validationMiddleware from '../middlewares/validationMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User login route
userRouter.post('/login', loginUserValidation, login);

// User logout route
userRouter.get('/logout', logout);

export default userRouter;
