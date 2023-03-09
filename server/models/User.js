const mongoose = require("mongoose");

const stringValue = {
  type: String,
  trim: true,
  require: true,
};

/* Creating the user schema with name, email, password and date */
const UserSchema = new mongoose.Schema(
  {
    name: stringValue,
    email: stringValue,
    password: stringValue,
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
/* Exporting schema with collection as User */
const User = mongoose.model("User", UserSchema);

module.exports = User;
