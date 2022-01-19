const mongoose = require("mongoose");

const ManagementSchema = new mongoose.Schema(
  {
    builder: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Management", ManagementSchema);
