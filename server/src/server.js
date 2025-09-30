import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/adminauth.js";
import cookieParser from "cookie-parser";
import customerdataRoutes from "./routes/customerdata.js";
import publicCustomerRoutes from "./routes/publicCustomer.js";
import cors from "cors";
import qs from "qs";
import analyticsRoutes from "./routes/analyticsroutes.js";
import mediafolderRoutes from "./routes/mediafolder.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.set("query parser", str => qs.parse(str));
app.use(express.json()); // for parsing the json data from frontend
app.use(cookieParser()); // for parsing the cookies from frontend
app.use(express.urlencoded({ extended: true })); // for parsing the form data from frontend

// app.use(cors());

// frontedn url to access the server
const allowedOrigins = [
  process.env.CLIENT_URL, 
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// app.use("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api", analyticsRoutes); // for handling the analytics routes


// admin routes
app.use("/api", authRoutes); // for handling the admin routes
// customer data routes
app.use("/api/customer", customerdataRoutes); // for handling the customer data routes
// media folder routes
app.use("/api/mediafolder", mediafolderRoutes); // for handling the media folder routes

// public routes
app.use("/api/public", publicCustomerRoutes); // for handling the public customer data routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
