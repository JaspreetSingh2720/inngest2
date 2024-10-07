const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    courseStartDate: {
      type: Date,
    },
    email: {
      type: String
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", usersSchema);

module.exports = { Users };
