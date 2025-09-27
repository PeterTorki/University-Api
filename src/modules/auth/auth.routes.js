import express from 'express';
import { signin, signup, verificationEmail } from './auth.controller.js';
import { validate } from '../../middleware/validations.middleware.js';
import { comparePassword, hashPassword } from '../../middleware/hashPass.middleware.js';
import { checkEmail, loginEmail } from '../../middleware/checkEmail.middleware.js';
import { checkVerification } from '../../middleware/checkVerification.js';

export const authRouter = express.Router()

authRouter.get("/verify/:token", verificationEmail);
authRouter.post("/signup", validate("signup"), hashPassword(), checkEmail(), validate("user"), signup);
authRouter.post("/login", loginEmail(), comparePassword(), checkVerification(), validate("login"), signin);