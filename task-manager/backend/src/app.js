const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to the Task Manager API!' });
});

app.use('/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;
