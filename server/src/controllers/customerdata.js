import express from "express";
import validator from "validator";
import prisma from "../utils/prisma.js";
import dotenv from "dotenv";
import xlsx from "xlsx";
import fs from 'fs';
import qs from "qs";


dotenv.config();

const generatecustomerId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


// bulk data upload

export const BulkUploaddata = async(req, res)=>{
  try {
    if(!req.file){
      return res.status(400).json({message:"No file uploaded"})
    }

      // Read Excel file
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if(!sheetData.length){
        fs.unlinkSync(req.file.path); // cleanup before exit
        return res.status(400).json({message:"No data found in the file"})
      }

      const customers = sheetData.map((row) => ({
        customerId: generatecustomerId(),
        name: row.Name,
        email: row.Email || null,
        phoneNumber: row.PhoneNumber?.toString(),
        whatsappNumber: row.WhatsappNumber?.toString() || null,
        state: row.State || null,
        district: row.District || null,
        tehsil: row.Tehsil || null,
        village: row.Village || null,
        address: row.Address || null,
        createdById: req.user.userId,
        createdByEmpId: req.user.empid,
      }));

      const result = await prisma.customerData.createMany({
        data: customers,
      });

      // Remove the uploaded file
      if (req.file && fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (fileError) {
          console.error('Error deleting uploaded file:', fileError);
        }
      }

      return res.status(200).json({
        message: "Bulk customer data uploaded successfully",
        InsertedData: result.count,
        
      });
   
      
  } catch (error) {
    console.log(error);
    
    // clear error after error also
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const Addcustomerdata = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      whatsappNumber,
      interestAreas,
      address,
      birthday,
      state,
      district,
      tehsil,
      village,
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

    if(!validator.isEmail(email)){
      return res.status(400).json({ message: "Invalid email" });
    }

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



    const customerdata = {
      customerId: generatecustomerId(),
      name,
      email,
      phoneNumber,
      whatsappNumber,
      ...(interestAreas && { interestAreas }),
      ...(address && { address }),
      birthday: birthday ? new Date(birthday) : null,
      state,
      district,
      tehsil,
      village,
      ...(infoSource && { infoSource }),
      ...(notes && { notes }),
      followUp: followUp ? new Date(followUp) : null,
      ...(workCategory && { workCategory }),
      ...(reelsVideo && { reelsVideo }),
      startDate: startDate ? new Date(startDate) : null,
      leadStage,
      priority,
      progressBoard,
      images: imageUrls,
      attachments: attachmentUrls,
      createdById: req.user.userId,
      createdByEmpId: req.user.empid,
      updateHistory:[{
        createdAt: new Date(),
        empId: req.user.empid || "Admin",
      }],
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


//   try {

//     const page = parseInt(req.query.page) ||1 ;
//     const limit = parseInt(req.query.limit) || 15 ;
//     const skip = (page - 1) * limit ;

//     const {
//      name,
//      leadStage,
//      priority,
//      customerId,
//      createdByEmpId,
//     } = req.query

//     const {
//       state,
//       district,
//       tehsil,
//       village,
//     } = req.query.location || {}

//     let where = {};

//     if(req.user.role === "EMPLOYEE"){
//        where.createdById = req.user.userId;
//        where.createdByEmpId = req.user.empid;
//     }
     
//     if(name){
//       where.name = {
//         contains: name,
//         mode: "insensitive",
//       }
//     }

//     if (leadStage) {
//       where.leadStage = leadStage;
//     }
//     if (priority) {
//       where.priority = priority;
//     }
//     if (customerId) {
//       where.customerId = { contains: customerId, mode: "insensitive" };
//     }
//     if (createdByEmpId) {
//       where.createdByEmpId = createdByEmpId;
//     }

//     if (state || district || tehsil || village) {
//       where.location = {
//         ...(state && { state: { contains: state, mode: 'insensitive' } }),
//         ...(district && { district: { contains: district, mode: 'insensitive' } }),
//         ...(tehsil && { tehsil: { contains: tehsil, mode: 'insensitive' } }),
//         ...(village && { village: { contains: village, mode: 'insensitive' } }),
//       };
//     }

//     const totalcount = await prisma.customerData.count({
//       where,
//     })

//     const customer = await prisma.customerData.findMany({
//       where,
//       skip,
//       take: limit,
//       orderBy:{
//         createdAt:"desc"
//       }
//     })

  
//     return res.status(200).json({
//       message: "Customer data fetched successfully",
//       customer,
//       totalcount,
//       totalpages: Math.ceil(totalcount / limit),
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getallcustomerdata = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const {
      name,
      leadStage,
      priority,
      customerId,
      createdByEmpId,
      state,
      district,
      tehsil,
      village,
    } = req.query;
    
    let where = {};

    if (req.user.role === "EMPLOYEE") {
      where.createdById = req.user.userId;
      where.createdByEmpId = req.user.empid;
    }

    if (name) where.name = { contains: name, mode: "insensitive" };
    if (leadStage) where.leadStage = leadStage;
    if (priority) where.priority = priority;
    if (customerId) where.customerId = { contains: customerId, mode: "insensitive" };
    if (createdByEmpId) where.createdByEmpId = createdByEmpId;
    if (state) where.state = {contains: state, mode: "insensitive"};
    if (district) where.district = {contains: district, mode: "insensitive"};
    if (tehsil) where.tehsil = {contains: tehsil, mode: "insensitive"};
    if (village) where.village = {contains: village, mode: "insensitive"};
    
    const totalcount = await prisma.customerData.count({ where });

    const customer = await prisma.customerData.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });


    return res.status(200).json({
      message: "Customer data fetched successfully",
      customer,
      totalcount,
      totalpages: Math.ceil(totalcount / limit),
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
      where: { id },
    });



    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (
      req.user.role === "EMPLOYEE" &&
      customer.createdById !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Forbidden - You are not authorized to access this data",
      });
    }

    // Parse location safely
    let parsedLocation = null;
    if (req.body?.location) {
      try {
        parsedLocation =
          typeof req.body.location === "string"
            ? JSON.parse(req.body.location)
            : req.body.location;

        parsedLocation = {
          state: parsedLocation?.state || null,
          district: parsedLocation?.district || null,
          tehsil: parsedLocation?.tehsil || null,
          block: parsedLocation?.block || null,
          village: parsedLocation?.village || null,
        };
      } catch (err) {
        console.error("Error parsing location:", err);
        return res.status(400).json({ message: "Invalid location format" });
      }
    }

    // Handle uploads
    let attachmentsUpdate = customer.attachments || [];
    let imagesUpdate = customer.images || [];

    if (req.files) {
      if (req.files.attachments) {
        attachmentsUpdate = req.files.attachments.map(f => f.path);
      }
      if (req.files.images) {
        imagesUpdate = req.files.images.map(f => f.path);
      }
    }

    // Clear if explicitly passed as "[]"
    if (req.body?.attachments === "[]") {
      attachmentsUpdate = [];
    }
    if (req.body?.images === "[]") {
      imagesUpdate = [];
    }

    // ✅ safe destructure
    const { attachments, images, ...rest } = req.body || {};

    const updatedCustomer = await prisma.customerData.update({
      where: { id },
      data: {
        ...rest,
        location: parsedLocation ? parsedLocation : undefined,
        attachments: attachmentsUpdate,
        images: imagesUpdate,

        // store update history 
        updateHistory:{
          push:{
            empId: req.user.empid || "Admin",
            updatedAt: new Date(),
          }
        }
      },
    });

    return res.status(200).json({
      message: "Customer data updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

