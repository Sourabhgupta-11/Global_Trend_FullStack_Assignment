import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setError('');
    setLoading(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          disabled={loading}
          aria-label="Task title"
        />
        <button
          className={styles.btn}
          type="submit"
          disabled={loading || !title.trim()}
          aria-label="Add task"
        >
          {loading ? '...' : '+'}
        </button>
      </div>
      <input
        className={`${styles.input} ${styles.desc}`}
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        aria-label="Task description"
      />
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
