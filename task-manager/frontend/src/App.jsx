import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
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
          <TaskForm/>
          <FilterBar/>
          <TaskList/>
        </main>
      </div>
    </div>
  );
}
