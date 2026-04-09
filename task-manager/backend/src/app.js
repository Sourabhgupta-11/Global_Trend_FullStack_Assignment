const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;
