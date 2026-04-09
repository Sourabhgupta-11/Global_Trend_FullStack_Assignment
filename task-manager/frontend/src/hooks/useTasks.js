import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/tasks';

export function useTasks(filter) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTasks(filter === 'all' ? undefined : filter);
      setTasks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title, description) => {
    const task = await api.createTask(title, description);
    setTasks((prev) => [task, ...prev]);
    return task;
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = await api.updateTask(id, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const editTask = async (id, title, description) => {
    const updated = await api.updateTask(id, { title, description });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, addTask, toggleTask, editTask, removeTask, refetch: fetchTasks };
}
