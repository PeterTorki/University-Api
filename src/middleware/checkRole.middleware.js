

export const checkRole = () => {
    return (req, res, next) => {
        const { role } = req.authUser;
        if (role !== "admin") return res.status(403).json({ message: "You are unAuthorized" })
        next()
    }
}