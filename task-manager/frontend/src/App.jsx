import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';

export default function App() {
  return (
    <main>
      <TaskForm/>
      <FilterBar />
      <TaskList/>
    </main>
  );
}
