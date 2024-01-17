const Task = require('../models/Task');
const mongoose = require('mongoose');

// Get all tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a single task by ID
async function getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

// Create a new task
async function createTask(req, res) {
  const task = new Task({
    description: req.body.description,
    completed: req.body.completed || false,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateTaskById = async (req, res) => {
    console.log("Update Task By Id", req.params);
    const taskId = req.params.id;
  
    // Check if taskId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
  
    try {
      // Find the task by ID
      const task = await Task.findById(taskId);
  
      // Check if the task exists
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Update the task properties
      if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
      }
  
      // Save the updated task
      await task.save();
  
      // Send the updated task in the response
      res.json({ task });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Delete a task by ID
async function deleteTaskById(req, res) {
    console.log("Delete Task By Id", req.params);
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
