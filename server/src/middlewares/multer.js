import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hans-solar",
    allowed_formats: ["mp4", "mov", "avi", "pdf", "docx", "txt" , "jpg", "jpeg", "png", "webp", "xlsx", "xls"],
    resource_type: "auto",
  },
});

export const upload = multer({ storage: Storage });

// Local storage (for Excel bulk uploads)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadLocal = multer({ storage: localStorage });


