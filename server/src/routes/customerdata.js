import { Router } from "express";
import { Addcustomerdata } from "../controllers/customerdata.js";
import { getallcustomerdata } from "../controllers/customerdata.js";
import { getCustomerdataById } from "../controllers/customerdata.js";
import { updateCustomerdata } from "../controllers/customerdata.js";
import { deleteCustomerdata } from "../controllers/customerdata.js";
import { searchCustomerdataByCustomerId } from "../controllers/customerdata.js";
import { upload } from "../middlewares/multer.js";
import { verifyRole } from "../middlewares/verifyadmin.js";

const router = Router();

router.post(
  "/addcustomerdata",
  verifyRole(["ADMIN", "EMPLOYEE"]),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "attachments", maxCount: 5 },
  ]), 
  Addcustomerdata
);

router.get("/getallcustomerdata", verifyRole(["ADMIN", "EMPLOYEE"]), getallcustomerdata);
router.get("/getcustomerbyid/:id", verifyRole(["ADMIN", "EMPLOYEE"]), getCustomerdataById);
router.put("/updatecustomer/:id", verifyRole(["ADMIN", "EMPLOYEE"]), updateCustomerdata);
router.delete("/deletecustomer/:id", verifyRole(["ADMIN"]), deleteCustomerdata);
router.get("/searchcustomer/:customerId", verifyRole(["ADMIN", "EMPLOYEE"]), searchCustomerdataByCustomerId);

export default router;
