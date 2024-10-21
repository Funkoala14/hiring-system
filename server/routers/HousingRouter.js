import { Router } from "express";
import { checkPermission, jwtValidation } from "../middlewares/authMiddleware.js";
import { getHousesList } from "../controllers/HousingController.js";

const housingRouter = Router();
// , jwtValidation, checkPermission('HR')
housingRouter.get('/list', getHousesList);

export default housingRouter;