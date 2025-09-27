import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    password: { type: String },
    isConfirmed: { type: Boolean, default: false },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
