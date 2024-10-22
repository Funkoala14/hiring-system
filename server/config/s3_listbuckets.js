import { S3Client, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import config from "./config.js";

const s3Client = new S3Client({
    region: config.AWS_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});

const listBuckets = async () => {
    try {
        const command = new ListBucketsCommand({});
        const response = await s3Client.send(command);
        console.log("S3 Buckets:");
        response.Buckets.forEach(bucket => {
            console.log(`- ${bucket.Name}`);
        });
    } catch (error) {
        console.error("Error listing buckets:", error);
    }
};

const listFilesInBucket = async (bucketName) => {
    try {
        const command = new ListObjectsV2Command({ Bucket: bucketName });
        const response = await s3Client.send(command);
        
        if (response.Contents && response.Contents.length > 0) {
            console.log(`Files in bucket "${bucketName}":`);
            response.Contents.forEach(file => {
                console.log(`- ${file.Key}`);
            });
        } else {
            console.log(`No files found in bucket "${bucketName}".`);
        }
    } catch (error) {
        console.error(`Error listing files in bucket "${bucketName}":`, error);
    }
};


listBuckets();
listFilesInBucket(config.AWS_S3_BUCKET_NAME)