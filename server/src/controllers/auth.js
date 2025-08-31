import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

dotenv.config();

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

    if(req.user.role !== "ADMIN"){
      return res.status(403).json({ message: "Forbidden - Admins only can create employees" });
    }

    const hashPassword = await bcrypt.hash(password, 10);  

    const LowerCaseName = name.toLowerCase();

    const CreateUser = {
      name: LowerCaseName,
      email,
      password: hashPassword,
      normalpass:password,
      role,
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


// get all employee data 

export const getEmployeeData = async(req , res)=>{
  try {

    if(req.user.role !== "ADMIN"){
      return res.status(403).json({ message: "Forbidden - Admins only can get employee data" });
    }

    const employee = await prisma.user.findMany({
      where:{
        role:"EMPLOYEE"
      }
    })

    return res.status(200).json({
      message:"Employee data fetched successfully",
      employee
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// export const getEmployeeDataById = async(req , res)=>{
//   try {

//     if(req.user.role !== "ADMIN"){
//       return res.status(403).json({ message: "Forbidden - Admins only can get employee data" });
//     }

//     const {id} = req.params;

//     const employee = await prisma.user.findUnique({
//       where:{
//         id
//       }
//     })

//     if(!employee){
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     return res.status(200).json({
//       message:"Employee data fetched successfully",
//       employee
//     })
    
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

export const updateEmployeeData = async(req , res)=>{
  try {

    const {id} = req.params;

    const {name , email , password , role} = req.body;

    const employee = await prisma.user.findUnique({
      where:{
        id
      }
    })

    if(!employee){
      return res.status(404).json({ message: "Employee not found" });
    }

    const LowerCaseName = name.toLowerCase();
    const hashPassword = await bcrypt.hash(password, 10);

    const updatedEmployeeData = {
      name: LowerCaseName,
      email,
      password: hashPassword,
      normalpass: password, 
      role,
    };

    const updatedEmployee = await prisma.user.update({
      where:{
        id
      },
      data:updatedEmployeeData
    })

    return res.status(200).json({
      message:"Employee data updated successfully",
      employee:updatedEmployee
    })    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteEmployeeData = async(req , res)=>{
  try {
    const {id} = req.params;

    const employee = await prisma.user.findUnique({
      where:{
        id
      }
    })

    if(!employee){
      return res.status(404).json({ message: "Employee not found" });
    }

    const deletedEmployee = await prisma.user.delete({
      where:{
        id
      }
    })

    return res.status(200).json({
      message:"Employee data deleted successfully",
      employee:deletedEmployee
    })    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// where role is employee and he want to login

export const login = async (req, res) => {
  try {
    const { name ,  email, password } = req.body;

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
    console.log(passwordvalid);

    if (!passwordvalid) {
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

    if(user.name !== name){
      return res.status(401).json({ message: "INVALID CREDENTIALS" });
    }

        // Check role based on route
        if (req.baseUrl.includes("/admin") && user.role !== "ADMIN") {
          return res.status(403).json({ message: "Forbidden - Admins only can Login" });
        }
        if (req.baseUrl.includes("/employee") && user.role !== "EMPLOYEE") {
          return res.status(403).json({ message: "Forbidden - Employees only can Login" });
        }

    // token and jwt logic here

    // generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token , user:{userId: user.id, name: user.name, email: user.email, normalpass: user.normalpass, role: user.role} });
  } catch (error) {
    console.log(error);
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
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
