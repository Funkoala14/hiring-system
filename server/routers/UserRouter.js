import { Router } from 'express';
import { login, logout, register, checkToken, getEmployeeInfo, 
    updateEmployeeInfo, updateAvatar, updateEmployeeDocuments } from '../controllers/UserController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { checkPermission, jwtValidation } from "../middlewares/authMiddleware.js";
import { uploadFileMiddleware, uploadMultipleFilesMiddleware } from '../middlewares/fileMiddleware.js';
const { loginUserValidation, createUserValidation } = validationMiddleware;

const userRouter = Router();

// User POST routes
userRouter
    .post('/register', createUserValidation, register)
    .post("/login", loginUserValidation, login)
    .post("/info", jwtValidation, getEmployeeInfo)
    .post("/update-info", jwtValidation, updateEmployeeInfo)
    .post("/update-avatar",jwtValidation, uploadFileMiddleware, updateAvatar)
    .post("/update-documents", jwtValidation, uploadMultipleFilesMiddleware, updateEmployeeDocuments);

// User GET routes
userRouter.get('/logout', logout);

// User verify token route
userRouter.get('/verify', jwtValidation, checkToken);

export default userRouter;
