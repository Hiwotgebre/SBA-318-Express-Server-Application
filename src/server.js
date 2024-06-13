const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//Middleware to parase Json and url-encoded form data
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Import routes
const taskRoutes = require('./routes/taskRoutes');

//Use Routes
app.use('/api/tasks', taskRoutes);

//Catch-all to server index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});