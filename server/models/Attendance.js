const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  recordType: {
    type: String,
    required: true,
    enum: ["checkIn", "checkOut"],
  },
  location: {
    type: String,
    required: true,
    enum: ["office", "remote"],
  },
  employee: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
  employeeName: {
    type:String,
    required:true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
  },
});

module.exports = Campaign = mongoose.model('attendance', AttendanceSchema);
