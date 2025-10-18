import express from "express";
import { deleteUser, getSpecificUser, getUser, updateUser } from "./user.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { checkRole } from "../../middleware/checkRole.middleware.js";
import { hashPassword } from "../../middleware/hashPass.middleware.js";
import { validate } from "../../middleware/validations.middleware.js";

const userRouter = express.Router();
// userRouter.get("/", auth(), checkRole(), getUser);
userRouter.get("/", getUser);
userRouter.get("/:id", auth(), checkRole(), getSpecificUser);
userRouter.delete("/:id", auth(), checkRole(), deleteUser);
userRouter.put("/:id", auth(), hashPassword(), validate("updateUser"), updateUser);

export default userRouter;
