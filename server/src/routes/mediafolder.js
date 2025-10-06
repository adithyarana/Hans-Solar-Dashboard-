import express from "express";
import { CreateFolder, GetFolderDataById, DeleteFolder, Getallmediafolderdata } from "../controllers/mediafolder.js";
import { verifyRole } from "../middlewares/verifyadmin.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.post("/createfolder/:id" , verifyRole(["ADMIN", "EMPLOYEE","HANSURJAMITRA"]), upload.fields([
  { name: "attachments", maxCount: 10 },
]), CreateFolder)
router.get("/getallmediafolderdata" , verifyRole(["ADMIN", "EMPLOYEE", "RECEPTIONIST","HANSURJAMITRA"]), Getallmediafolderdata)
router.get("/getfolder/:id" , verifyRole(["ADMIN", "EMPLOYEE", "RECEPTIONIST","HANSURJAMITRA"]), GetFolderDataById)
router.delete("/deletefolder/:id" , verifyRole(["ADMIN"]), DeleteFolder)

export default router
