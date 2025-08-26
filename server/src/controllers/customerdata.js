import express from "express";
import validator from "validator";
import prisma from "../utils/prisma.js";
import dotenv from "dotenv";

dotenv.config();

const generatecustomerId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const Addcustomerdata = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      whatsappNumber,
      interestAreas,
      address,
      birthday,
      infoSource,
      notes,
      followUp,
      workCategory,
      reelsVideo,
      startDate,
      leadStage,
      priority,
      progressBoard,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // validata phone no

    if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // whatsapp number is optional
    if (whatsappNumber && !validator.isMobilePhone(whatsappNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid whatsapp number" });
    }

    // add images|| attachments to cloudinary
    // i have made only one folder all files will be in that

    const imageUrls = req.files?.images
      ? req.files.images.map((file) => file.path)
      : [];

    const attachmentUrls = req.files?.attachments
      ? req.files.attachments.map((file) => file.path)
      : [];

     
      let parsedLocation = {};

      if (req.body.location) {
        try {
          // If location is already an object, don't parse again
          parsedLocation = 
            typeof req.body.location === "string"
              ? JSON.parse(req.body.location)
              : req.body.location;
        } catch (err) {
          console.error("Invalid location JSON:", err);
        }
      }
      


    const customerdata = {
      customerId: generatecustomerId(),
      name,
      phoneNumber,
      whatsappNumber,
      interestAreas: Array.isArray(interestAreas)
        ? interestAreas
        : interestAreas
        ? [interestAreas]
        : [], // fallback empty array
      address,
      birthday:birthday ? new Date(birthday) : null,
      location: {
        state: parsedLocation?.state || null,
        district: parsedLocation?.district || null,
        tehsil: parsedLocation?.tehsil || null,
        block: parsedLocation?.block || null,
        village: parsedLocation?.village || null,
      },
      infoSource,
      notes,
      followUp: followUp
        ? new Date(followUp)
        : null,
      workCategory,
      reelsVideo,
      startDate: startDate
        ? new Date(startDate)
        : null,
      leadStage,
      priority,
      progressBoard,
      images: imageUrls,
      attachments: attachmentUrls,
      createdById: req.user.userId,
    };

    const newcustomer = await prisma.customerData.create({
      data: customerdata,
    });

    res.status(200).json({
      message: "Customer data added successfully",
      customer: newcustomer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getallcustomerdata = async (req, res) => {
  try {
    let customer;

    // if role is employyee only getch his lead data

    if (req.user.role === "EMPLOYEE") {
      customer = await prisma.customerData.findMany({
        where: {
          createdById: req.user.userId,
        },
      });
    } else {
      // give all data to admin dashboard
      customer = await prisma.customerData.findMany();
    }

    return res.status(200).json({
      message: "Customer data fetched successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCustomerdataById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customerData.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // if role is employee only get his lead data

    if (
      req.user.role === "EMPLOYEE" &&
      customer.createdById !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Forbidden - You are not authorized to access this data",
      });
    }

    return res.status(200).json({
      message: "Customer data fetched successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCustomerdata = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customerData.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // if role is employee only get his lead data

    if (
      req.user.role === "EMPLOYEE" &&
      customer.createdById !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Forbidden - You are not authorized to access this data",
      });
    }

    const updatedCustomer = await prisma.customerData.update({
      where: {
        id,
      },
      data: req.body,
    });

    return res.status(200).json({
      message: "Customer data updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCustomerdata = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customerData.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Forbidden - You are not authorized to access this data",
      });
    }

    await prisma.customerData.delete({ where: { id } });

    return res
      .status(200)
      .json({ message: "Customer data deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// searcj cusotmerdata for the created 6 digit customerId

export const searchCustomerdataByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;

    // if admin get all data

    const customer = await prisma.customerData.findUnique({
      where: {
        customerId,
      },
    });

    if (!customerId) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // if employee seach by customerid

    if (req.user.role === "EMPLOYEE") {
      if (customer.createdById !== req.user.userId) {
        return res.status(403).json({
          message: "Forbidden - You are not authorized to access this data",
        });
      }
    }

    return res
      .status(200)
      .json({ message: "Customer data fetched successfully", customer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
