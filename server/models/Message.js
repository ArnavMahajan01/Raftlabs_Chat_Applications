const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

/* Creating the user schema with name, email, password and date */
const MessageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Chatroom is required",
      ref: "Chatroom",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User is required",
      ref: "User",
    },
    message: stringValue,
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const User = mongoose.model("Message", MessageSchema);

module.exports = User;
