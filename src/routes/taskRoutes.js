const express = require('express');
const router = express.Router();

// Temporary in-memory "database"
let tasks = [];

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// Create a new task
router.post('/', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name,
        assignedTo: req.body.assignedTo,
        dueDate: req.body.dueDate,
        status: req.body.status
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Update a task
router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    task.name = req.body.name;
    task.assignedTo = req.body.assignedTo;
    task.dueDate = req.body.dueDate;
    task.status = req.body.status;
    res.json(task);
});

// Delete a task
router.delete('/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
