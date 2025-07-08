const db = require("../models");
const { remoteConfig } = require("../firebase/firebase");

const Video = db.Video;

const addVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);

    // Construct the key and value
    const key = `${req.body.variant}_video_url_${req.body.lessonId}`;
    const value = JSON.stringify({
      videoUrl: req.body.url,
      videoThumbnail: req.body.thumbnail,
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

module.exports = { addVideo };
