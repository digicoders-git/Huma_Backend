const localUpload = require("../config/localUpload");
const { upload: cloudinaryUpload } = require("../config/cloudinary");

// Smart upload middleware: Uses Cloudinary if credentials are provided, otherwise falls back to local.
const getUploadMiddleware = () => {
  if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME) {
    console.log("Using Cloudinary for uploads");
    return cloudinaryUpload;
  } else {
    console.log("Using local storage for uploads");
    return localUpload;
  }
};

const upload = getUploadMiddleware();

module.exports = upload;
