import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import config from '../config/config.js';
import { s3Client } from '../middlewares/fileMiddleware.js';


export const deleteFile = async (req, res) => {
    const { name } = req.body;

    try {
        await deleteFileFn(name);
        res.status(200).send({
            message: 'File deleted successfully',
            code: 200,
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send({
            message: 'File deletion failed',
            error: error.message,
        });
    }
};

export const deleteFileFn = async (name) => {
    const params = {
        Bucket: config.AWS_S3_BUCKET_NAME,
        Key: name,
    };

    try {
        await s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send({
            message: 'File deletion failed',
            error: error.message,
        });
    }
};
