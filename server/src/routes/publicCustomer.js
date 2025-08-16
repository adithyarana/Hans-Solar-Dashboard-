import {Router} from "express";
import { publicCustomerdata } from "../controllers/publicCustomer.js";

const router = Router();

router.post("/publiccustomerdata",publicCustomerdata);

export default router;
