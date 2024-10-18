import { Router } from 'express';
import { getEmployeeList } from '../controllers/UserController.js';

const employeeRouter = Router();

employeeRouter.get('/list', getEmployeeList);

export default employeeRouter;
