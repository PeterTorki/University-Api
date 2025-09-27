import User from "../../Database/models/user/user.model.js";


export const checkEmail = () => {
    return async (req, res, next) => {
        const { email } = req.body;
        const user = await User.find({ email }).select("-password")
        if (user.length > 0) return res.status(200).json({ message: "Email already exist" })
        next()
    }
}
export const loginEmail = () => {
    return async (req, res, next) => {
        const { email } = req.body;
        const user = await User.find({ email })
        if (user.length === 0) return res.status(200).json({ message: "User Not found" })
        req.user = user[0];
        next()
    }
}