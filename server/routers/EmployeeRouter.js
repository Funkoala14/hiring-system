import { Router } from "express";
import { getEmployeeList } from "../controllers/UserController";

const employeeRouter = Router();

employeeRouter.get("/employee-list", getEmployeeList);

export default employeeRouter;
