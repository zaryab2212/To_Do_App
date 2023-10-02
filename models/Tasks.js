const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enums: ["default", "personal", "shopping", "whishlist", "work"],
      default: "default",
    },
    status: {
      type: String,
      enums: ["pending", "compeleted"],
      default: "pending",
    },
    name: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
