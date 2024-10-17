import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

export const generatePresignedUrl = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const REGION = process.env.REGION;
    const BUCKET = process.env.AWS_S3_BUCKET_NAME;
    
    try {
        const data = JSON.parse(event.body);
        const KEY = `posters/${Date.now()}_${data.fileName}`;

        const client = new S3Client({ region: REGION });
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: KEY,
            ContentType: data.contentType
        });
        const presignedURL = await getSignedUrl(client, command, { expiresIn: 360 });
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ status: "Success", url: presignedURL, key: KEY }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
            }
        });
    } catch (error) {
        console.error("Error generating presigned URL: ", error);
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to generate presigned URL." }),
        });
    }
};