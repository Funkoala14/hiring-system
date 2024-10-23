import { Router } from 'express';
import { getEmployeeDocs, getEmployeeList } from '../controllers/UserController.js';
import { checkPermission, jwtValidation } from '../middlewares/authMiddleware.js';

const employeeRouter = Router();

employeeRouter
    .get('/list', jwtValidation, checkPermission('HR'), getEmployeeList)
    .post('/docs', jwtValidation, getEmployeeDocs);

export default employeeRouter;
