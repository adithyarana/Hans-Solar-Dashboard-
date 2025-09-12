import prisma from "../utils/prisma.js";

// get all employee data

export const getEmployeeData = async (req, res) => {
    try {
  
      if (req.user.role !== "ADMIN") {
        return res
          .status(403)
          .json({ message: "Forbidden - Admins only can get employee data" });
      }
  
      const employee = await prisma.user.findMany({
        where: {
          role: {"in": ["EMPLOYEE", "RECEPTIONIST"]} ,
        },
      });
  
      return res.status(200).json({
        message: "Employee data fetched successfully",
        employee,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
export const updateEmployeeData = async (req, res) => {
    try {
      const { id } = req.params;
  
      const { name, email, password, role } = req.body;
  
      const employee = await prisma.user.findUnique({
        where: {
          id,
        },
      });
  
      if (!employee) {
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
        where: {
          id,
        },
        data: updatedEmployeeData,
      });
  
      return res.status(200).json({
        message: "Employee data updated successfully",
        employee: updatedEmployee,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
export const deleteEmployeeData = async (req, res) => {
    try {
      const { id } = req.params;
  
      const employee = await prisma.user.findUnique({
        where: {
          id,
        },
      });
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      const deletedEmployee = await prisma.user.delete({
        where: {
          id,
        },
      });
  
      return res.status(200).json({
        message: "Employee data deleted successfully",
        employee: deletedEmployee,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };