const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  room: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    default: true,
    required:true
  }
});

module.exports = mongoose.model("Users", userSchema);
