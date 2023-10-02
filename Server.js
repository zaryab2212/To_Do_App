const express = require("express");
const connection = require("./Db");
require("dotenv").config("./env");
const multer = require("multer");
const cookieParder = require("cookie-parser");
const cors = require("cors");
const { fileURLToPath } = require("url");
const path = require("path");
const userRouter = require("././routes/User");
const tasksRouter = require("././routes/tasks");
const { register } = require("./controllers/User");
const cookieParser = require("cookie-parser");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//server
const app = express();

// Middleware

app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
//this will join the the to directly access assets dir
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const picturePath =
      new Date().toDateString().replace(/:/g, "-") + file.originalname;
    req.body.picturePath = picturePath;
    cb(null, picturePath);
  },
});

const upload = multer({ storage });

//routes
app.use("/auth/register", upload.single("picture"), register);
app.use("/auth", userRouter);
app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "working" });
});

//Db connection and Port
connection();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
