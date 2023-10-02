const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "User name is required"] },
    email: {
      type: String,
      unique: [true, "Email is already in use"],
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      // select: false,
    },
    picturePath: {
      type: String,
      // require: [true, "Picture is required"],
    },
  },
  { timestamps: true }
);

const userMOdel = mongoose.model("User", userSchema);
module.exports = userMOdel;
