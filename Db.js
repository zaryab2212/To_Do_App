const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TodoApp");
    console.log("Data Base is connected Succesfully");
  } catch (error) {
    console.log("there is been an error connecting Data base");
  }
};

module.exports = connection;
