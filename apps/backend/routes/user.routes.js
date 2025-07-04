const express = require("express");
const { saveUser } = require("../middlewares/userAuth.middleware");
const { signup, login } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", saveUser, signup);
router.post("/login", login);

module.exports = router;