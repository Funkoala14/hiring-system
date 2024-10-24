import { Router } from 'express';
import { getEmployeeDocs, getEmployeeInfo, getEmployeeList, updateAvatar, updateEmployeeDocuments, updateEmployeeInfo } from '../controllers/UserController.js';
import { checkPermission, jwtValidation } from '../middlewares/authMiddleware.js';
import { uploadFileMiddleware, uploadMultipleFilesMiddleware } from '../middlewares/fileMiddleware.js';

const employeeRouter = Router();

employeeRouter
    .get('/list', jwtValidation, checkPermission('HR'), getEmployeeList)
    .post('/docs', jwtValidation, getEmployeeDocs)
    .post('/info', jwtValidation, getEmployeeInfo)
    .post('/update-info', jwtValidation, updateEmployeeInfo)
    .post('/update-avatar', jwtValidation, uploadFileMiddleware, updateAvatar)
    .post('/update-documents', jwtValidation, uploadMultipleFilesMiddleware, updateEmployeeDocuments);

export default employeeRouter;
