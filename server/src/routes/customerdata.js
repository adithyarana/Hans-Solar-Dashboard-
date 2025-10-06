import { Router } from "express";
import { Addcustomerdata } from "../controllers/customerdata.js";
import { getallcustomerdata } from "../controllers/customerdata.js";
import { getCustomerdataById } from "../controllers/customerdata.js";
import { updateCustomerdata } from "../controllers/customerdata.js";
import { deleteCustomerdata } from "../controllers/customerdata.js";
import { upload, uploadLocal } from "../middlewares/multer.js";
import { verifyRole } from "../middlewares/verifyadmin.js";
import { BulkUploaddata } from "../controllers/customerdata.js";
const router = Router();



router.post(
  "/addcustomerdata",
  verifyRole(["ADMIN", "EMPLOYEE", "HANSURJAMITRA"]),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "attachments", maxCount: 5 },
  ]), 
  Addcustomerdata
);

router.post("/bulkuploaddata", verifyRole(["ADMIN"]), uploadLocal.single("file"), BulkUploaddata);

router.get("/getallcustomerdata", verifyRole(["ADMIN", "EMPLOYEE", "RECEPTIONIST", "HANSURJAMITRA"]), getallcustomerdata);
router.get("/getcustomerbyid/:id", verifyRole(["ADMIN", "EMPLOYEE", "RECEPTIONIST", "HANSURJAMITRA"]), getCustomerdataById);
router.put("/updatecustomer/:id", verifyRole(["ADMIN", "EMPLOYEE", "HANSURJAMITRA"]), updateCustomerdata);
router.delete("/deletecustomer/:id", verifyRole(["ADMIN"]), deleteCustomerdata);


export default router;
