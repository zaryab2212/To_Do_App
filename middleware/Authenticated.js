const jwt = require("jsonwebtoken");

exports.Authenticated = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const verfyToken = jwt.verify(req.cookies.token, process.env.JWTSECRET);
    if (!verfyToken) {
      return res.status(404).json({
        success: false,
        message: "not a vaild token",
        error,
      });
    }
    req.user = verfyToken;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Auth Failed",
      error,
    });
  }
};
