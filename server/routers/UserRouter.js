import { Router } from 'express';
import { login, logout, getEmployeeInfo, updateEmployeeInfo } from '../controllers/UserController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User POST routes
userRouter
    .post('/login', loginUserValidation, login)
    .post('/info', getEmployeeInfo)
    .post('/update-info', updateEmployeeInfo);

// User GET routes
userRouter.get('/logout', logout);

export default userRouter;
