const taskModel = require("../models/Tasks");
const dayjs = require("dayjs");

exports.createTask = async (req, res) => {
  const { id } = req.user;
  const completionDate = new Date(req.body.date);
  try {
    const newTask = await taskModel.create({
      ...req.body,
      userId: id,
      date: completionDate,
    });
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "New task added",
      newTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to create task",
      error,
    });
  }
};
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const UpdatedTask = await taskModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      UpdatedTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to update task",
      error,
    });
  }
};
exports.getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const fetchTask = await taskModel.findById({ _id: id });
    if (!fetchTask) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task found Successfully",
      fetchTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to get single  task",
      error,
    });
  }
};
exports.getAllTask = async (req, res) => {
  const { id } = req.user;
  const type = req.query?.type;
  var day = req.query?.day;
  try {
    var min, max;
    if (day === "today") {
      min = dayjs().format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    }
    if (day === "seven") {
      min = dayjs().subtract(7, "day").format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    }
    if (day === "thirty") {
      min = dayjs().subtract(30, "day").format("YYYY-MM-DD");
      max = dayjs().format("YYYY-MM-DD");
    }
    if (type && day) {
      const task = await taskModel.find({
        userId: id,
        type,
        date: { $lte: new Date(max), $gte: new Date(min) },
      });
      return res.status(200).json({
        success: true,
        message: "Task found Successfully type",
        task,
      });
    }

    if (type) {
      const task = await taskModel.find({
        userId: id,
        type,
      });
      return res.status(200).json({
        success: true,
        message: "Task found Successfully type",
        task,
      });
    }
    if (day) {
      const task = await taskModel.find({
        userId: id,
        date: { $lte: new Date(max), $gte: new Date(min) },
      });
      return res.status(200).json({
        success: true,
        message: "Task found Successfully type",
        task,
      });
    }

    if (!type && !day) {
      const task = await taskModel.find({ userId: id });

      return res.status(200).json({
        success: true,
        message: "Task found Successfully",
        task,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Uable to fetch all  tasks",
      error,
    });
  }
};
