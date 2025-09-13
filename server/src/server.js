import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/adminauth.js";
import cookieParser from "cookie-parser";
import customerdataRoutes from "./routes/customerdata.js";
import publicCustomerRoutes from "./routes/publicCustomer.js";
import cors from "cors";
import qs from "qs";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.set("query parser", str => qs.parse(str));
app.use(express.json()); // for parsing the json data from frontend
app.use(cookieParser()); // for parsing the cookies from frontend
app.use(express.urlencoded({ extended: true })); // for parsing the form data from frontend

// app.use(cors());

// frontedn url to access the server
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// admin routes
app.use("/api", authRoutes); // for handling the admin routes
// customer data routes
app.use("/api/customer", customerdataRoutes); // for handling the customer data routes

// public routes
app.use("/api/public", publicCustomerRoutes); // for handling the public customer data routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
