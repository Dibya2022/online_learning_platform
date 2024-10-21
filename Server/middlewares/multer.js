import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Correctly setting the upload directory
  },
  filename: (req, file, cb) => {
    const id = uuid(); // Generate a unique ID for the file
    const extName = file.originalname.split(".").pop(); // Get the file extension
    const fileName = `${id}.${extName}`; // Create the final file name

    cb(null, fileName); // Correctly pass the file name to the callback
  },
});

export const uploadFiles = multer({ storage }).single("file"); // Set up multer to handle a single file upload
