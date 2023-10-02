const mongoose = require("mongoose");
const userMOdel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { email, password, picture } = req.body;

  console.log(req.body);
  console.log(email);
  // console.log(password);
  try {
    const verifyUser = await userMOdel.find({ email });
    // console.log(verifyUser);
    // if (verifyUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "user already Existi please login",
    //     error,
    //   });
    // }
    console.log(email);
    const salt = await bcrypt.genSalt();
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    console.log(email);
    const newUser = await userMOdel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "create User",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to create User",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userMOdel.findOne({ email }).select("+password");
    // console.log(user);
    //VERFY THE EMAIL
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does not exitst",
      });
    }

    //VERIFY THE PASSWORD
    // console.log("user", password);
    // console.log("db", user.password);

    const verfyPass = await bcrypt.compare(password, user.password);

    if (!verfyPass) {
      return res.status(400).json({
        success: false,
        message: "Password doest not match",
      });
    }

    // const { password, ...user } = user;
    //SETTING COOKIES
    const token = await jwt.sign({ id: user._id }, process.env.JWTSECRET);
    res
      .status(200)
      .cookie("token", token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })
      .json({
        success: true,
        message: "user login successfully",
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to login User",
      error,
    });
  }
};
