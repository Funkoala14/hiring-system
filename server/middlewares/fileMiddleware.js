import { S3Client } from '@aws-sdk/client-s3';
import config from '../config/config.js';
import multer from 'multer';
import multerS3 from 'multer-s3';

// Initialize S3 client
export const s3Client = new S3Client({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

// Define multer storage using multerS3
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: config.AWS_S3_BUCKET_NAME,
        key: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp for unique filenames
        },
    }),
});

// Middleware to handle multiple file uploads
export const uploadMultipleFilesMiddleware = upload.fields([
    { name: 'profilePicture', maxCount: 1 },               // Profile image
    { name: 'driverLicenseFile', maxCount: 1 },      // Driver license
    { name: 'visaDocuments', maxCount: 5 },      // Visa documents (multiple files)
]);

// Single file upload for a generic field 'file'
export const uploadFileMiddleware = upload.single('file');
