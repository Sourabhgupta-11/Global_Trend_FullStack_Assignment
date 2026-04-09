const store = require('../store');

const getTasks = (req, res) => {
  const { status } = req.query;
  let tasks = store.getAll();

  if (status === 'completed') tasks = tasks.filter((t) => t.completed);
  else if (status === 'incomplete') tasks = tasks.filter((t) => !t.completed);

  res.json({ success: true, data: tasks });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ success: false, error: 'Title is required and must be a non-empty string.' });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({ success: false, error: 'Title must be 200 characters or fewer.' });
  }

  const task = store.create({ title, description });
  res.status(201).json({ success: true, data: task });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { completed, title, description } = req.body;

  const existing = store.getById(id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Task not found.' });
  }

  const updates = {};

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ success: false, error: '"completed" must be a boolean.' });
    }
    updates.completed = completed;
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Title must be a non-empty string.' });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ success: false, error: 'Title must be 200 characters or fewer.' });
    }
    updates.title = title.trim();
  }

  if (description !== undefined) {
    updates.description = description.trim();
  }

  const updated = store.update(id, updates);
  res.json({ success: true, data: updated });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const deleted = store.delete(id);

  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Task not found.' });
  }

  res.json({ success: true, message: 'Task deleted.' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
