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
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    body("employeeId", "Please include valid employee Id").exists(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    console.log("entered post login route")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { employeeId, password } = req.body;

    try {
      let user = await User.findOne({ employeeId });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            secure: false,
            // signed: true,
            // sameSite: "None", 
          });

          console.log("cookie set",token)

          res.json({ message: "Logged in Successfully" });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/logout", (req, res) => {
  console.log("logout page");
  res.clearCookie('jwtoken', {path: '/'});
  res.status(200).send("User Logout");
});



module.exports = router;
