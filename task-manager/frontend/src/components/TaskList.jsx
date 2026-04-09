import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, loading, error, onToggle, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} />
        <span className={styles.hint}>Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <span className={styles.errorIcon}>⚠</span>
        <span className={styles.errorText}>{error}</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>◎</span>
        <p className={styles.emptyText}>Nothing here yet.</p>
        <p className={styles.emptyHint}>Add a task above to get started.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
