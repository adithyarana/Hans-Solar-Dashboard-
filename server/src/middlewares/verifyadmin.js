import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized - Invalid token" });
            }
            req.adminemail = decoded.email;
            next();
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default verifyAdmin;
