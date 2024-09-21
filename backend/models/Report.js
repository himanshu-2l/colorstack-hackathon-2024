// models/Report.js
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  typeOfPost: {
    type: String,
    default: "Issue",
    enum: ["Issue", "Lost and found"],
    required: true
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In Progress", "Resolved"],
  },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
