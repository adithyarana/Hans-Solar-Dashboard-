import express from "express";
import { registerUser, login, logout } from "../controllers/auth.js";
import { verifyRole } from "../middlewares/verifyadmin.js";

const router = express.Router();

// admin routes 
router.post("/registerEmployee", verifyRole(["ADMIN"]), registerUser);

router.post("/login", login);

router.post("/logout", logout);

export default router;
