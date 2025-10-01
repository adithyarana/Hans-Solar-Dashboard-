import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

dotenv.config();

async function countEmployee() {
  const lastemployee = await prisma.user.findFirst({
    where: {
      role: "EMPLOYEE",
    },
    orderBy: {
      empid: "desc",
    },
  });

  let newempid = 1;

  if (lastemployee?.empid) {
    const num = parseInt(lastemployee.empid.replace("HUM", ""), 10);
    newempid = num + 1;
  }

  return `HUM${String(newempid).padStart(2, "0")}`;
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admins only can create employees" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const LowerCaseName = name.toLowerCase();

    let empId;
    if(role === "EMPLOYEE"){
      empId = await countEmployee();
    }

    const CreateUser = {
      name: LowerCaseName,
      email,
      password: hashPassword,
      normalpass: password,
      role,
      empid: empId,
    };

    const newuser = await prisma.user.create({
      data: CreateUser,
    });

    return res
      .status(200)
      .json({ message: "Employee created successfully", user: newuser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// where role is employee and he want to login

export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  push the auth details in database

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    const passwordvalid = await bcrypt.compare(password, user.password);

    if (!passwordvalid) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    if (user.name !== name) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }


    // token and jwt logic here
    
    // generate token
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        empid: user.empid  // Include empid in the token payload
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: {
          userId: user.id,
          name: user.name,
          email: user.email,
          normalpass: user.normalpass,
          role: user.role,
          empid: user.empid,
        },

      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
