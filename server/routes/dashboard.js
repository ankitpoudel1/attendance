const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
//file upload
// const multer = require('multer');
const path = require('path');
// router.options('*', cors())
router.use(express.static(__dirname + "./public/"));

// const Storage = multer.diskStorage({
//     destination: "./public/uploadcontact/",
//     filename: (req, file, cd) => {
//         cd:(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));

//     }
// });
// const upload = multer({
//     storage: Storage
// }).single('image');


//...../file upload

router.get("/", auth, async (req, res) => {
  try {
    console.log("welcome to dashboard")
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});