import User from "../../../Database/models/user/user.model.js";
import { getOrSetCache } from "../../../Database/redis.js";
import { verifyEmail } from "../../services/emailVerification.js";
import { clearUserCache } from "../../utils/clearCache.js";

export const getUser = async (req, res) => {
  try {
    const users = await getOrSetCache("users_all", async () => {
      return await User.find();
    });
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Users",
      details: error.message,
    });
  }
};

export const getSpecificUser = async (req, res) => {
  try {
    let { id } = req.params;
    const specificUser = await getOrSetCache(`user/${id}`, async () => {
      return await User.findById(id);
    });
    if (!specificUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ User: specificUser });
  } catch (err) {
    res.status(500).json({ error: "User not found" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    clearUserCache("users_all");
    clearUserCache("user", id);
    res.status(200).json({ message: "User deleted successfully", userDeleted: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    const existUser = await User.findById(id);
    if (!existUser) return res.status(404).json({ message: "User not found" });
    const existEmail = req.body.email && req.body.email !== existUser.email;
    if (existEmail) {
      req.body.isConfirmed = false;
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    clearUserCache("users_all");
    clearUserCache("user", id);
    if (existEmail) {
      verifyEmail(existUser, req);
    }
    res.status(200).json({
      message: existEmail ? "User updated and verification email sent" : "User updated successfully",
      userUpdated: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
