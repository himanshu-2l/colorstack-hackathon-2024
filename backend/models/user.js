const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  NameFirst: {
    required: true,
    type: String,
  },
  NameLast: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  Pass: {
    required: true,
    type: String,
  },
  Admin: {
    required: true,
    type: Boolean,
  },
});


module.exports = mongoose.model("User", userSchema);
