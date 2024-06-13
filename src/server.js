const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

//Middleware to parase Json and url-encoded form data
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.unlencoded({ extended: true}));

//Import routes
const taskRoutes = require('./routes/taskRoutes');
