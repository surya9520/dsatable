import { Router } from "express";
import { getRemark, getUsersSolution, postRemark } from "../controllers/adminRemarkControllers.js";

const adminRemarkRouter=Router();

adminRemarkRouter.post('/',postRemark);
adminRemarkRouter.get('/',getRemark);
adminRemarkRouter.get('/user',getUsersSolution)

export {adminRemarkRouter}  