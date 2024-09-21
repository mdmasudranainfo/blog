import { v2 as cloudinary } from "cloudinary";
import multer, { FileFilterCallback } from "multer";
import * as fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dzwgyl1os",
  api_key: "397857336684659",
  api_secret: "vx_j-qfvtHX_zv-h9NVWAkKabag",
});

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// File filter to accept only image files
const fileFilter = (
  _req,
  // eslint-disable-next-line no-undef
  file,
  cb
) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."));
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const publicId = path.parse(file.originalname).name;

    cloudinary.uploader.upload(
      file.path,
      {
        public_id: publicId,
      },
      (error, result) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
