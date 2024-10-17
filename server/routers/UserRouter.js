import { Router } from 'express';
import { login, logout, checkToken, getEmployeeInfo, updateEmployeeInfo } from '../controllers/UserController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import jwtValidation from '../middlewares/authMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User POST routes
userRouter
    .post('/login', loginUserValidation, login)
    .post('/info', getEmployeeInfo)
    .post('/update-info', updateEmployeeInfo);

// User GET routes
userRouter.get('/logout', logout);

// User verify token route
userRouter.get('/verify', jwtValidation, checkToken);

export default userRouter;
