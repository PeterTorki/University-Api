import { Schema, model } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);
const Department = model("Department", DepartmentSchema);

export default Department;
