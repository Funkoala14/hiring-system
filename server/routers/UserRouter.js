import { Router } from 'express';
import { login, logout, register, checkToken } from '../controllers/UserController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import {  jwtValidation } from "../middlewares/authMiddleware.js";
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User POST routes
userRouter
    .post('/register', createUserValidation, register)
    .post("/login", loginUserValidation, login)

// User GET routes
userRouter.get('/logout', logout);

// User verify token route
userRouter.get('/verify', jwtValidation, checkToken);

export default userRouter;
