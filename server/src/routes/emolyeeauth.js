import { Router } from "express";
import { login, logout } from "../controllers/auth.js";

const router = Router();

// employee routes
router.post("/login",login);
router.post("/logout",logout);

export default router;
