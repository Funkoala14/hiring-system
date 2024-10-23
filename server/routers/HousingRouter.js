import { Router } from 'express';
import { checkPermission, jwtValidation } from '../middlewares/authMiddleware.js';
import { deleteHouse, getHousesList, postAddHouse } from '../controllers/HousingController.js';
import { commentValidation, housingValidation, reportValidation } from '../middlewares/validationMiddleware.js';
import { commentReport, createNewReport, getReportListByHouse, getReportById } from '../controllers/FacilityReportController.js';

const housingRouter = Router();

housingRouter
    .get('/list', jwtValidation, checkPermission('HR'), getHousesList)
    .get('/report-list/:houseId', getReportListByHouse)
    .get('/report/:reportId', jwtValidation, getReportById)
    .post('/add', jwtValidation, checkPermission('HR'), housingValidation, postAddHouse)
    .post('/new-report', jwtValidation, checkPermission('Employee'), reportValidation, createNewReport)
    .post('/report/comment', jwtValidation, commentValidation, commentReport)
    .delete('/delete/:houseId', jwtValidation, checkPermission('HR'), deleteHouse);

export default housingRouter;
