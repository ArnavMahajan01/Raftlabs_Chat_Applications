const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

/* Creating the user schema with name, email, password and date */
const ChatroomSchema = new mongoose.Schema(
  {
    name: stringValue,
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

module.exports = Chatroom;
