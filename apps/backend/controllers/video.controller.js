const db = require("../models");
const { remoteConfig } = require("../firebase/firebase");
const { uploadToS3 } = require("../utils/helpers");

const Video = db.Video;

const addVideo = async (req, res) => {
  console.log(req);
  try {
    const { title, variant, lessonId } = req.body;
    const videoFile = req.files.video?.[0];
    const thumbnailFile = req.files.thumbnail?.[0];

    if (!title || !variant || !lessonId || !videoFile || !thumbnailFile) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Upload to S3
    const [videoS3UploadResult, thumbnailS3UploadResult] = await Promise.all([
      uploadToS3(videoFile, "videos"),
      uploadToS3(thumbnailFile, "thumbnails"),
    ]);

    // Save to DB
    const video = await Video.create({
      url: videoS3UploadResult.Location,
      thumbnail: thumbnailS3UploadResult.Location,
      title,
      variant,
      lessonId,
    });

    // Construct the key and value
    const key = `${variant}_video_url_${lessonId}`;
    const value = JSON.stringify({
      videoUrl: videoS3UploadResult.Location,
      videoThumbnail: thumbnailS3UploadResult.Location,
    });

    // Fetch current remote config template
    const template = await remoteConfig.getTemplate();

    // Set new parameter
    template.parameters[key] = {
      defaultValue: { value },
    };

    // Publish updated template
    await remoteConfig.publishTemplate(template);
    console.log(`Remote Config updated: ${key} = ${value}`);

    return res.status(201).json({ message: "Video added successfully", video });
  } catch (error) {
    console.log(error);
  }
};

const getVideos = async (req, res) => {
  console.log("I am here------------------------")
  try {
    const videos = await Video.findAll();
    return res
      .status(200)
      .json({ message: "Videos fetched successfully", videos });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addVideo, getVideos };
