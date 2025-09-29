import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

// Cloudinary storage config
const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const extension = path.extname(file.originalname).slice(1).toLowerCase(); // e.g. 'pdf'
    const baseName = path.parse(file.originalname).name; // e.g. 'invoice'

    let resourceType = "auto";
    let format = "";
    let public_id = baseName;

    // Force raw type for document formats
    if (["pdf", "docx", "txt", "xlsx", "xls"].includes(extension)) {
      resourceType = "raw";
      format = extension;
      public_id = `${baseName}.${extension}`; // ensures extension in URL
    }

    return {
      folder: "hans-solar",
      allowed_formats: [
        "mp4", "mov", "avi",
        "pdf", "docx", "txt",
        "jpg", "jpeg", "png", "webp",
        "xlsx", "xls"
      ],
      resource_type: resourceType,
      format: format || undefined,
      public_id: public_id,
      use_filename: true,
      unique_filename: false,
      type: "upload"
    };
  },
});

export const upload = multer({ storage: Storage });

// Local storage config (for Excel bulk uploads)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadLocal = multer({ storage: localStorage });