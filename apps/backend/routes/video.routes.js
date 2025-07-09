const express = require("express");
const { addVideo, getVideos } = require("../controllers/video.controller");
const { uploadVideoMiddleware } = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/add", uploadVideoMiddleware, addVideo);
router.get("/get", getVideos);

module.exports = router;
