import express from "express";
import { registerHansUrja, loginHansUrja, logoutHansUrja } from "../controllers/hunsurjaauth.js";
import { verifyRole } from "../middlewares/verifyadmin.js";
import { getHunsurjaData, getHunsurjaById, updateHunsurjaData, deleteHunsurjaData } from "../controllers/hunsurjadata.js";

const router = express.Router();

// admin routes 
router.post("/registerHansUrja", verifyRole(["ADMIN"]), registerHansUrja);
router.get("/getHunsurjaData", verifyRole(["ADMIN"]), getHunsurjaData);
router.get("/getHunsurjaById/:id", verifyRole(["ADMIN"]), getHunsurjaById);
router.patch("/updateHunsurjaData/:id", verifyRole(["ADMIN"]), updateHunsurjaData);
router.delete("/deleteHunsurjaData/:id", verifyRole(["ADMIN"]), deleteHunsurjaData);

// auth routes 
router.post("/loginHansUrja", loginHansUrja);
router.post("/logoutHansUrja", logoutHansUrja);

export default router;