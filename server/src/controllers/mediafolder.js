import express from "express";
import prisma from "../utils/prisma.js";
import cloudinary from "../utils/cloudinary.js";

export const CreateFolder = async (req, res) => {
  try {
    const { folderName, description } = req.body;

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Customer id is required in route params" });
    }
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return res.status(400).json({ message: "Invalid customer id format" });
    }
  

    if (!folderName || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // attachments is optional
    const attachmentsUrl = req.files.attachments?.map((file) => file.path) || [];

    const folder = await prisma.mediaFolder.create({
      data: {
        folderName,
        description,
        customerData: { connect: { id } },
        attachments:attachmentsUrl,
      },
    });

    return res.status(200).json({
      folder,
      message: "Folder created successfully",
    });
  } catch (error) {
    console.error("CreateFolder error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetFolderDataById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("GetFolderDataById -> id:", id);

    if (!id) {
      return res.status(400).json({ message: "folderId is required in route params" });
    }

    const folder = await prisma.mediaFolder.findUnique({
      where: {
        id: id,
      },
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    return res.status(200).json({
      folder,
      message: "Folder Data  fetched successfully",
    });
  } catch (error) {
    console.error("GetFolderDataById error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteFolder = async (req, res) => {
  try {

    const {id}= req.params

    const folder= await prisma.mediaFolder.findUnique({
      where:{
         id:id
      }
    })

    if(!folder){
      return res.status(404).json({ message: "Folder not found" });
    }

    // extract public id from url
    const extractPublicId = (url) => {
      const uploadIndex = url.indexOf('/upload/');
      const publicIdWithVersion = url.substring(uploadIndex + 8); // skip "/upload/"
      const publicId = publicIdWithVersion.replace(/v\d+\//, '').replace(/\.[^/.]+$/, '');
      return publicId;
    };

    const deleteattachments = await Promise.all(
      folder.attachments.map((attachment) => {
        return cloudinary.uploader.destroy(extractPublicId(attachment))
      })
    )

    const folderdelete = await prisma.mediaFolder.delete({
      where:{
        id:id
      }
    })

    return res.status(200).json({
       folderdelete,
       cloudinaryResult: deleteattachments,
       message:"Folder and attachments deleted successfully from cloudinary",
     
    })
  } catch (error) {
    console.error("DeleteFolder error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
