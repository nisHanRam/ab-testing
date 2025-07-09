const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadVideoMiddleware = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

module.exports = { uploadVideoMiddleware };
