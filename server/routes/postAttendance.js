const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    body("employeeId", "Employee Id is required").not().isEmpty(),
    // body("phoneNumber", "Phone Number is required").not().isEmpty(),
    body(
      "recordType",
      "record Type is required"
    ).not().isEmpty(),
    body(
        "location",
        "Location is required"
      ).not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { employeeId, recordType, location,remarks } = req.body;


    try {
      var user = await User.findOne({ employeeId });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User not found" }] });
      }

      attendance = new Attendance({
        recordType:recordType,
        employee:user.id,
        employeeName:user.name,
        location,
        remarks
      })

      console.log("attendance",attendance);
      await attendance.save();
   

      res.status(200).send("Attendance recorded successfully");

    } catch (error) {
      console.error(error.message);
      // res.status(500).send('Server error');
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;
