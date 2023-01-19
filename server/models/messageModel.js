const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    roomNumber:{
      type: String,
      require: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    isConfession:{
      type: Boolean,
      required: true,
      default: false,
    },
    isVisible:{
      type: Boolean,
      required: true,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
