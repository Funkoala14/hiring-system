import { Router } from "express";
import { deleteFile } from "../controllers/S3BucketController.js";

const fileRouter = Router();

fileRouter.delete("", deleteFile);

export default fileRouter;
