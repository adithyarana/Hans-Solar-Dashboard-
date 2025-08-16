import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import customerdataRoutes from "./routes/customerdata.js";
import publicCustomerRoutes from "./routes/publicCustomer.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json()); // for parsing the json data from frontend
app.use(cookieParser()); // for parsing the cookies from frontend
app.use(express.urlencoded({ extended: true })); // for parsing the form data from frontend

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/admin",authRoutes); // for handling the admin routes
app.use("/api/admin",customerdataRoutes); // for handling the customer data routes
app.use("/api/public",publicCustomerRoutes); // for handling the public customer data routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
