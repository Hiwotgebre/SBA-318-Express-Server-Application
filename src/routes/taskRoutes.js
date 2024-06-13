const express = require('express');
const router = express.Router();

// Temporary in-memory "database"
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Create a new task
router.post('/', (req, res) => {
    const task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    res.status(201).json(task);
});

// Export the router
module.exports = router;
