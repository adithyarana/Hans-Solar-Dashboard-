import { Analytics , EmployeeAnalytics} from "../controllers/analytics.js";
import express from "express";
import { verifyRole } from "../middlewares/verifyadmin.js";

const router = express.Router();    

router.get("/analytics", verifyRole(["ADMIN"]), Analytics);
router.get("/employeeanalytics/:empid", verifyRole(["EMPLOYEE"]), EmployeeAnalytics);

export default router;
