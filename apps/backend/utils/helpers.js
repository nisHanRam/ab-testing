const { s3 } = require("./s3");
const { v4: uuidv4 } = require("uuid");

const uploadToS3 = (file, folder) => {
  const fileExtension = file.originalname.split(".").pop();
  const key = `${folder}/${uuidv4()}.${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = { uploadToS3 };
