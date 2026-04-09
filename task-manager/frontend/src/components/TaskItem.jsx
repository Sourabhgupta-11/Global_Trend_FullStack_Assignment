import { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = async () => {
    setLoading(true);
    try { await onToggle(task.id); } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    setLoading(true);
    try { await onDelete(task.id); } catch (e) { setError(e.message); setLoading(false); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setLoading(true);
    setError('');
    try {
      await onEdit(task.id, editTitle.trim(), editDesc.trim());
      setEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditing(false);
    setError('');
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });

  return (
    <div className={`${styles.item} ${task.completed ? styles.done : ''} ${loading ? styles.muted : ''}`}>
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={handleToggle}
        disabled={loading}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5l3.5 3.5L11 1" stroke="#0e0e0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className={styles.body}>
        {editing ? (
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <input
              className={styles.editInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={200}
              autoFocus
              disabled={loading}
            />
            <input
              className={`${styles.editInput} ${styles.editDesc}`}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description (optional)"
              disabled={loading}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.editActions}>
              <button className={styles.saveBtn} type="submit" disabled={loading || !editTitle.trim()}>
                Save
              </button>
              <button className={styles.cancelBtn} type="button" onClick={handleEditCancel} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <span className={styles.title}>{task.title}</span>
            {task.description && <span className={styles.desc}>{task.description}</span>}
            <span className={styles.date}>{formattedDate}</span>
            {error && <p className={styles.error}>{error}</p>}
          </>
        )}
      </div>

      {!editing && (
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => setEditing(true)} disabled={loading} aria-label="Edit task">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete} disabled={loading} aria-label="Delete task">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4h10M6 4V2.5h4V4M5 4v8.5h6V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
