import { Router } from "express";
import { verifyUser } from "../middlewares/verifyadmin.js";
import { Addcustomerdata } from "../controllers/customerdata.js";
import { getallcustomerdata } from "../controllers/customerdata.js";
import { getCustomerdataById } from "../controllers/customerdata.js";
import { updateCustomerdata } from "../controllers/customerdata.js";
import { deleteCustomerdata } from "../controllers/customerdata.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/addcustomerdata",
  verifyUser,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "attachments", maxCount: 5 },
  ]), 
  Addcustomerdata
);

router.get("/getallcustomerdata", verifyUser, getallcustomerdata);
router.get("/getcustomerbyid/:id", verifyUser, getCustomerdataById);
router.put("/updatecustomer/:id", verifyUser, updateCustomerdata);
router.delete("/deletecustomer/:id", verifyUser, deleteCustomerdata);

export default router;
