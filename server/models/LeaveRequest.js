const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
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
  approved: {
    type: Boolean,
    default: false // You can set a default value
  }
});

module.exports = Campaign = mongoose.model('leaveRequest', LeaveRequestSchema);
