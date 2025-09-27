


export const checkVerification = () => {
    return (req, res, next) => {
        const { isConfirmed } = req.user;
        if (isConfirmed == false) return res.status(403).json({ message: "Verify your email first" })
        next()
    }
}