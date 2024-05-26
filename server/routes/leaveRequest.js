const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");
const LeaveRequest = require("../models/LeaveRequest");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.get(
  "/:employeeId",
  async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const employee = await User.findOne({employeeId});
        if (!employee) {
            return res
              .status(400)
              .json({ errors: [{ msg: "User not found" }] });
          }
        const leaveRequests = await LeaveRequest.find({
            employee:employee.id
        }).sort({ createDate: -1 }).limit(45);
      
        // console.log("attendances",attendances)
        res.json(leaveRequests);

        // res.json("jh",id);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
  
  }
);
