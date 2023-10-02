const express = require("express");
const { login } = require("../controllers/User");
const router = express.Router();

// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Credentials",
//     "true",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
router.post("/login", login);

module.exports = router;
