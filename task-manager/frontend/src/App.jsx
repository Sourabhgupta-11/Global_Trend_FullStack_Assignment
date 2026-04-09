import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading, error, addTask, toggleTask, editTask, removeTask } = useTasks(filter);

  const counts = {
    all: filter === 'all' ? tasks.length : undefined,
    incomplete: filter === 'incomplete' ? tasks.length : undefined,
    completed: filter === 'completed' ? tasks.length : undefined,
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <span className={styles.logo}>◈</span>
            <h1 className={styles.title}>Tasks</h1>
          </div>
          <p className={styles.subtitle}>Stay on top of what matters.</p>
        </header>

        <main>
          <TaskForm onAdd={addTask} />
          <FilterBar current={filter} onChange={setFilter} counts={counts} />
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={removeTask}
          />
        </main>
      </div>
    </div>
  );
}
