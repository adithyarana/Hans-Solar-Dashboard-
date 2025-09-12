import express from "express";
import { registerUser, login, logout } from "../controllers/auth.js";
import { verifyRole } from "../middlewares/verifyadmin.js";
import { getEmployeeData , updateEmployeeData , deleteEmployeeData } from "../controllers/employesdata.js";

const router = express.Router();

// admin routes 
router.post("/registerEmployee", verifyRole(["ADMIN"]), registerUser);
router.get("/getEmployeeData", verifyRole(["ADMIN"]), getEmployeeData);
router.put("/updateEmployeeData/:id", verifyRole(["ADMIN"]), updateEmployeeData);
router.delete("/deleteEmployeeData/:id", verifyRole(["ADMIN"]), deleteEmployeeData);

router.post("/login", login);

router.post("/logout", logout);

export default router;
