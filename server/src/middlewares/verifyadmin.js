import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * ✅ Allow both ADMIN and EMPLOYEE but check roles explicitly
 */
export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    verifyUser(req, res, () => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden - Access denied" });
      }
      next();
    });
  };
};
