import User from './../../../Database/models/user/user.model.js';
import jwt from "jsonwebtoken"
import { verifyEmail } from '../../services/emailVerification.js';
import { clearUserCache } from '../../utils/clearCache.js';

export const signin = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id, role: req.user.role }, "UserToken")
        const userObj = req.user.toObject();
        delete userObj.password;
        clearUserCache()
        res.status(200).json({ message: "User logged", User: userObj, token: token })
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
}



export const signup = async (req, res) => {
    try {
        const newUser = new User(req.body);
        verifyEmail(newUser, req)
        clearUserCache()
        await newUser.save();
        res.status(201).json({ message: "user created successfully", user: newUser })
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
}

export const verificationEmail = async (req, res) => {
    try {
        const { token } = req.params
        const data = jwt.verify(token, "verifyEmail")
        clearUserCache()
        const user = await User.findByIdAndUpdate({ _id: data._id, isConfirmed: false }, { isConfirmed: true }, { new: true })
        if (!user) res.status(404).json({ message: "User not found" })
        res.status(200).json({ message: "User verification successfully " })
    } catch (error) {
        res.status(500).json({ Error: error.message })
    }
}