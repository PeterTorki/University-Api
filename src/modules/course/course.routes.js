import express from "express";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  getSpecificCourse,
  updateCourse,
} from "./course.controller.js";
import { validate } from "../../middleware/validations.middleware.js";
import { checkRole } from "../../middleware/checkRole.middleware.js";
import { auth } from "../../middleware/auth.middleware.js";

const courseRouter = express.Router();
courseRouter.get("/", auth(), checkRole(), getAllCourse);
courseRouter.get("/:id", auth(), checkRole(), getSpecificCourse);
courseRouter.post("/", auth(), checkRole(), validate("course"), addCourse);
courseRouter.delete("/:id", auth(), checkRole(), deleteCourse);
courseRouter.put("/:id", auth(), checkRole(), validate("updateCourse"), updateCourse);

export default courseRouter;
