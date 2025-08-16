import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const ImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/hans-solar/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
  },
});

// vedios + document in this folder /hans-solar/attachments

const AttachmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hans-solar/attachments",
    allowed_formats: ["mp4", "mov", "avi", "pdf", "docx", "txt"],
    resource_type: "auto", // auto detects video or raw file
  },
});

export const uploadImage = multer({ storage: ImageStorage });
export const uploadAttachment = multer({ storage: AttachmentStorage });
