const express = require("express");
const {
  updateTask,
  createTask,
  getSingleTask,
  getAllTask,
} = require("../controllers/Tasks");
const { Authenticated } = require("../middleware/Authenticated");

const router = express.Router();

router.get("/", Authenticated, getAllTask);
router.post("/create", Authenticated, createTask);
router.put("/update/:id", Authenticated, updateTask);
router.get("/:id", Authenticated, getSingleTask);

module.exports = router;
