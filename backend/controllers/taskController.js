const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      priority,
      dueDate,
      status
    } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required"
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      createdBy: req.userId
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.userId
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.userId
      },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// module.exports = {
//   createTask,
//   getTasks,
//   getTaskById,
//   updateTask,
//   deleteTask
// };
