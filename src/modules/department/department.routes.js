import express from "express";
import { auth } from './../../middleware/auth.middleware.js';
import { checkRole } from './../../middleware/checkRole.middleware.js';
import {
  addDepartment,
  deleteDepartment,
  getAllDepartment,
  getSpecificDepartment,
  updateDepartment,
} from "./department.controller.js";
import { validate } from "../../middleware/validations.middleware.js";





const departmentRouter = express.Router();
departmentRouter.get("/", auth(), checkRole(), getAllDepartment);
departmentRouter.get("/:id", auth(), checkRole(), getSpecificDepartment);
departmentRouter.post("/", auth(), checkRole(), validate("department"), addDepartment);
departmentRouter.delete("/:id", auth(), checkRole(), deleteDepartment);
departmentRouter.put("/:id", auth(), checkRole(), updateDepartment);

export default departmentRouter;
