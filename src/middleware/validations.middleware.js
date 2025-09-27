import Ajv from "ajv";
import addFormats from "ajv-formats";
import { createUserSchema, updateUserSchema } from '../modules/user/user.validation.js';
import { createCourseSchema, updateCourseSchema } from '../modules/course/course.validation.js';
import { createDepartmentSchema, updateDepartmentSchema } from '../modules/department/department.validation.js';
import { loginValidation, signUpValidation } from "../modules/auth/auth.validation.js";


const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);


const validators = {
  user: ajv.compile(createUserSchema),
  updateUser: ajv.compile(updateUserSchema),
  course: ajv.compile(createCourseSchema),
  updateCourse: ajv.compile(updateCourseSchema),
  department: ajv.compile(createDepartmentSchema),
  updateDepartment: ajv.compile(updateDepartmentSchema),
  signup: ajv.compile(signUpValidation),
  login: ajv.compile(loginValidation),
};

export const validate =
  (schemaName) => {
    return (req, res, next) => {
      const validateFn = validators[schemaName];
      if (!validateFn) {
        return res.status(500).json({ error: `Schema '${schemaName}' not found` });
      }

      const valid = validateFn(req.body);

      if (!valid) {
        return res.status(400).json({
          error: "Validation failed",
          details: validateFn.errors,
        });
      }

      next();
    };
  }
