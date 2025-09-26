import express from "express";
import { CreateFolder, GetFolderDataById, DeleteFolder, Getallmediafolderdata } from "../controllers/mediafolder.js";
import { verifyRole } from "../middlewares/verifyadmin.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.post("/createfolder/:id" , verifyRole(["ADMIN", "EMPLOYEE"]), upload.fields([
  { name: "attachments", maxCount: 10 },
]), CreateFolder)
router.get("/getallmediafolderdata" , verifyRole(["ADMIN", "EMPLOYEE"]), Getallmediafolderdata)
router.get("/getfolder/:id" , verifyRole(["ADMIN", "EMPLOYEE"]), GetFolderDataById)
router.delete("/deletefolder/:id" , verifyRole(["ADMIN", "EMPLOYEE"]), DeleteFolder)

export default router
