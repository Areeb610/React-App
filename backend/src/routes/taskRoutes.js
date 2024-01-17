const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks
router.get('/', taskController.getAllTasks);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Create a task
router.post('/', taskController.createTask);

// Update a task by ID
router.patch('/:id', taskController.updateTaskById);

// Delete a task by ID
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;
