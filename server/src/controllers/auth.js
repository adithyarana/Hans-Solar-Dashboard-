import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  push the auth details in database

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // if (
    //   email !== process.env.ADMIN_EMAIL ||
    //   password !== process.env.ADMIN_PASSWORD
    // ) {
    //   return res.status(401).json({ message: "INVALID CREDENTIALS" });
    // }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }
   

    const passwordvalid = await bcrypt.compare(password, admin.password);
    console.log(passwordvalid);

    if (!passwordvalid) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    // token and jwt logic here

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Admin Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Admin Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
