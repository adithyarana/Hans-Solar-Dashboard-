import express from "express";
import validator from "validator";
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
      location,
      infoSource,
      notes,
      followUp,
      workCategory,
      reelsVideo,
      startDate,
      leadStage,
      priority,
      progressBoard,
      images,
      attachments,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !address ||
      !location.district ||
      !location.tehsil
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // validata phone no

    if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!validator.isMobilePhone(whatsappNumber, "en-IN")) {
      return res.status(400).json({ message: "Invalid whatsapp number" });
    }

    // add images|| attachments to cloudinary

    res.status(200).json({ message: "Customer data added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getallcustomerdata = async (req, res) => {
  try {
  } catch (error) {}
};

export const getCustomerdataById = async (req, res) => {
  try {
  } catch (error) {}
};

export const updateCustomerdata = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteCustomerdata = async (req, res) => {
  try {
  } catch (error) {}
};
