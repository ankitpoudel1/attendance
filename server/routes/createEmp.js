const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
var crypto = require('crypto');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("name", "Name is required").not().isEmpty(),
    body("employeeId", "Employee Id is required").not().isEmpty(),
    // body("phoneNumber", "Phone Number is required").not().isEmpty(),
    body(
      "password",
      "Please enter password"
    ).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, employeeId, password } = req.body;


    try {
      let user = await User.findOne({ employeeId });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }


      var userExists = true;
      var buf;

      while (userExists!=null){
      buf =  crypto.randomBytes(40); 
      userExists = await User.findOne({activeToken:buf});
      }

      role="normal";

      user = new User({
        name,
        employeeId,
        role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      
      await user.save();
   

      res.status(200).send("Signed up successfully");

    } catch (error) {
      console.error(error.message);
      // res.status(500).send('Server error');
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;
