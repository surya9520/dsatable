import { Router } from "express";
import { addDsaProblem, getAllProblems } from "../controllers/dsaControllers.js";


const dsaRouter = Router();

dsaRouter.post("/", addDsaProblem);
dsaRouter.get("/", getAllProblems);


export {dsaRouter}