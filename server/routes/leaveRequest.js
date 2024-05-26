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

router.post(
    "/",
    [
      body("employeeId", "Employee Id is required").not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
  
      const { employeeId, remarks } = req.body;
  
  
      try {
        var user = await User.findOne({ employeeId });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User not found" }] });
        }
  
        var leaveRequest = new LeaveRequest({
          employee:user.id,
          employeeName:user.name,
          remarks
        })
  
        await leaveRequest.save();
     
  
        res.status(200).send("Leave request recorded successfully");
  
      } catch (error) {
        console.error(error.message);
        // res.status(500).send('Server error');
        res.status(500).send(error.message);
      }
    }
  );


module.exports = router;
