const express = require("express");
const { saveUser } = require("../middlewares/userAuth.middleware");
const { signup, login, setGender } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", saveUser, signup);
router.post("/login", login);
router.patch("/:id/gender", setGender);

module.exports = router;
