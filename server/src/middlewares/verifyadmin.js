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

// to chekc if admin is logged in he can only create the employees

export const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }
    next();
  });
};

export const verifyEmployee = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role !== "EMPLOYEE") {
      return res.status(403).json({ message: "Forbidden - Employees only" });
    }
    next();
  });
};

/**
 * ✅ Allow both ADMIN and EMPLOYEE but check roles explicitly
 */
export const verifyRole = (roles) => {
  return (req, res, next) => {
    verifyUser(req, res, () => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden - Not allowed" });
      }
      next();
    });
  };
};
