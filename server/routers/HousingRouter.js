import { Router } from "express";
import { checkPermission, jwtValidation } from "../middlewares/authMiddleware.js";
import { deleteHouse, getHousesList, postAddHouse } from "../controllers/HousingController.js";
import { housingValidation } from "../middlewares/validationMiddleware.js";

const housingRouter = Router();

housingRouter
    .get("/list", jwtValidation, checkPermission("HR"),  getHousesList)
    .post("/add", jwtValidation, checkPermission("HR"), housingValidation, postAddHouse)
    .delete("/delete", jwtValidation, checkPermission("HR"), deleteHouse);

export default housingRouter;
