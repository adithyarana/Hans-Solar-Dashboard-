import express from "express";
import { registerUser, login, logout } from "../controllers/auth.js";
import { verifyAdmin } from "../middlewares/verifyadmin.js";

const router = express.Router();

// admin routes 
router.post("/registerEmployee", verifyAdmin, registerUser);

router.post("/login", login);

router.post("/logout", logout);

export default router;
