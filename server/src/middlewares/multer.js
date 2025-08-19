import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hans-solar",
    allowed_formats: ["mp4", "mov", "avi", "pdf", "docx", "txt" , "jpg", "jpeg", "png", "webp"],
    resource_type: "auto",
  },
});

export const upload = multer({ storage: Storage });



