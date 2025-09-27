import { Schema, model } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Course = model("Course", CourseSchema);

export default Course;
