import multer from "multer";
import nextConnect from "next-connect";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect();

apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing by Next.js to use multer
  },
};
