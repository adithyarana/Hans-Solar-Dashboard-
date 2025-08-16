import { Router } from "express";
import { uploadImage, uploadAttachment } from "../middlewares/multer.js";
import verifyAdmin from "../middlewares/verifyadmin.js";
import { Addcustomerdata } from "../controllers/customerdata.js";
import { getallcustomerdata } from "../controllers/customerdata.js";
import { getCustomerById } from "../controllers/customerdata.js";
import { updateCustomer } from "../controllers/customerdata.js";
import { deleteCustomer } from "../controllers/customerdata.js";

const router = Router();

router.post(
  "/addcustomerdata",
  verifyAdmin,
  uploadImage.array("images",5),
  uploadAttachment.array("attachments",5),
  Addcustomerdata
);

router.get("/getallcustomerdata",verifyAdmin,getallcustomerdata);
router.get("/getcustomerbyid/:id",verifyAdmin,getCustomerById);
router.put("/updatecustomer/:id",verifyAdmin,updateCustomer);
router.delete("/deletecustomer/:id",verifyAdmin,deleteCustomer);

export default router;
