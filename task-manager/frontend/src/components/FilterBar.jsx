import styles from './FilterBar.module.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'incomplete', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.btn} ${current === value ? styles.active : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
          {counts[value] !== undefined && (
            <span className={styles.badge}>{counts[value]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
