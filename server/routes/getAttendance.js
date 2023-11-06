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
        const attendances = await Attendance.find({
            employee:employee.id
        }).sort({ createDate: -1 }).limit(45);
      
        // console.log("attendances",attendances)
        res.json(attendances);

        // res.json("jh",id);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
  
  }
);

router.get(
  "/date/:date",
  async (req, res) => {
    try {

    
        const specificDate = req.params.date;
        console.log("date",specificDate);
        // var specificDate = new Date("2023-11-05"); // Replace with your desired date

// Calculate the start and end of the specific day
        var startOfDay = new Date(specificDate);
        startOfDay.setHours(0, 0, 0, 0); // Set to midnight

        var endOfDay = new Date(specificDate);
        endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

      

        const attendances = await Attendance.find({
          createDate: {
            $gte: startOfDay,
            $lt: endOfDay}})
            
        res.json(attendances)

        
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

})

module.exports = router;
