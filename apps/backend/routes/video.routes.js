const express = require('express');
const { addVideo } = require('../controllers/video.controller');

const router = express.Router();

router.post("/add", addVideo);

module.exports = router;