import Course from "../../../Database/models/courses/course.model.js";
import { clearUserCache } from "../../utils/clearCache.js";
import { getOrSetCache } from "./../../../Database/redis.js";
import User from "../../../Database/models/user/user.model.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await getOrSetCache("courses", async () => {
      return await Course.find().populate("department");
    });
    res.status(200).json({ AllCourses: courses });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Courses",
      details: error.message,
    });
  }
};
export const getSpecificCourse = async (req, res) => {
  try {
    let { id } = req.params;
    const course = await getOrSetCache("courses", async () => {
      return await Course.findById(id).populate("department");
    });
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Courses",
      details: error.message,
    });
  }
};

export const addCourse = async (req, res) => {
  try {
    const courses = new Course({ ...req.body });
    clearUserCache(`courses`);
    await courses.save();
    res.status(201).json({
      message: "course Created Successfully",
      course: courses,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    let { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }
    clearUserCache(`courses`, id);
    res.status(200).json({
      message: "course deleted successfully",
      courseDeleted: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("department");

    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    const updatedStudentIds = course.students.map((s) => s.toString());

    // 1️⃣ إضافة الكورس للطلاب الجدد
    await User.updateMany(
      { _id: { $in: updatedStudentIds }, enrolledCourses: { $ne: course._id } },
      { $push: { enrolledCourses: course._id } }
    );

    // 2️⃣ إزالة الكورس من الطلاب اللي تم مسحه من الكورس
    await User.updateMany(
      { _id: { $nin: updatedStudentIds }, enrolledCourses: course._id },
      { $pull: { enrolledCourses: course._id } }
    );

    clearUserCache(`courses`, id);

    res.status(200).json({
      message: "course updated successfully and students synced",
      courseUpdated: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
