import { Router } from 'express';
import { getEmployeeList } from '../controllers/UserController.js';
import { checkPermission, jwtValidation } from '../middlewares/authMiddleware.js';

const employeeRouter = Router();

employeeRouter.get('/list', jwtValidation, checkPermission('HR'), getEmployeeList);

export default employeeRouter;
