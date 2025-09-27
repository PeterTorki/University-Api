import bcrypt from 'bcrypt';


export const hashPassword = () => {
    return async (req, res, next) => {
        const { password } = req.body
        if (!password) next()
        const hashedPass = await bcrypt.hash(password, 10);
        req.body.password = hashedPass;
        next()
    }
}

export const comparePassword = () => {
    return async (req, res, next) => {
        try {
            const { password } = req.body;
            const isMatch = await bcrypt.compare(password, req.user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Wrong email or password" });
            }
            next()
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }
}