import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config.js";
import multer from "multer";
import multerS3 from "multer-s3";
import mime from "mime";

export const s3Client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: config.AWS_S3_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
    contentType: (req, file, cb) => {
      // Detect the Content-Type using mime library
      const mimeType =
        mime.getType(file.originalname) || "application/octet-stream";
      cb(null, mimeType);
    },
    acl: "public-read",
  }),
});

export const uploadFileMiddleware = upload.single("file");
