import { Router } from 'express';
import User from '../controllers/UserController.js';
const { login, logout, checkToken } = User;
import validationMiddleware from '../middlewares/validationMiddleware.js';
import jwtValidation from '../middlewares/authMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User login route
userRouter.post('/login', loginUserValidation, login);

// User logout route
userRouter.get('/logout', logout);

// User verify token route
userRouter.get('/verify', jwtValidation, checkToken);

export default userRouter;
