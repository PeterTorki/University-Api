import Department from "../../../Database/models/department/department.model.js";
import { getOrSetCache } from "../../../Database/redis.js";
import { clearUserCache } from "../../utils/clearCache.js";

export const getAllDepartment = async (req, res) => {
  try {
    const departments = await getOrSetCache('/departments', async () => {
      return await Department.find();
    })
    res.status(200).json({ AllDepartments: departments });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Departments",
      details: error.message
    });
  }
};

export const getSpecificDepartment = async (req, res) => {
  try {
    let { id } = req.params;
    const department = await getOrSetCache(`/departments/${id}`, async () => {
      return await Department.findById(id);
    })
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch This department",
      details: error.message
    });
  }
};

export const addDepartment = async (req, res) => {
  const data = req.body;
  try {
    const allDepartments = await Department.find();
    const existName = allDepartments.find((department) => {
      return department.name == data.name;
    });
    if (existName) {
      return res.status(208).json({ message: "Name already exist" });
    }
    const departments = new Department({ ...data });
    clearUserCache(`departments`)
    await departments.save();
    res.status(201).json({
      message: "department Created Successfully",
      department: departments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    let { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "department not found" });
    }
    clearUserCache(`departments`, id)
    res.status(200).json({
      message: "department deleted successfully",
      departmentDeleted: department,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const updateDepartment = async (req, res) => {
  try {
    let { id } = req.params;
    const department = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!department) {
      return res.status(404).json({ message: "department not found" });
    }
    clearUserCache(`departments`, id)
    res.status(200).json({
      message: "department updated successfully",
      departmentUpdated: department,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
