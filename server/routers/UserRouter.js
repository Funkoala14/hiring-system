import { Router } from 'express';
import { login, logout, register, checkToken, getEmployeeInfo, updateEmployeeInfo, updateAvatar} from '../controllers/UserController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { checkPermission, jwtValidation } from "../middlewares/authMiddleware.js";
import { uploadFileMiddleware } from '../middlewares/fileMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User POST routes
userRouter
    .post('/register', createUserValidation, register)
    .post("/login", loginUserValidation, login)
    .post("/info", jwtValidation, getEmployeeInfo)
    .post("/update-info", jwtValidation, updateEmployeeInfo)
    .post("/update-avatar",jwtValidation, uploadFileMiddleware, updateAvatar);

// User GET routes
userRouter.get('/logout', logout);

// User verify token route
userRouter.get('/verify', jwtValidation, checkToken);

export default userRouter;
