import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
