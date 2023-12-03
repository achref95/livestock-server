const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    lsNumber: {
      type: String,
      required: [true, "live stock number is required."],
      unique: true,
    },
    comment: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
