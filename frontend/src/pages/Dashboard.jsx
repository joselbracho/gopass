import React, { useEffect, useState } from 'react';
import { projectService } from '../services/api';
import styles from '../styles/App.module.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectService.getAll().then(res => setProjects(res.data));
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.gradientText}>Project Dashboard</h1>
      <div className={styles.grid}>
        {projects.map(project => (
          <div key={project.id} className={styles.card}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className={styles.taskSection}>
              <strong>Active Tasks:</strong>
              <ul style={{ padding: 0 }}>
                {project.tasks?.slice(0, 3).map(task => (
                  <li key={task.id} className={styles.taskItem}>
                    <span className={`${styles.badge} ${styles[task.priority.toLowerCase()]}`}>
                      {task.priority}
                    </span>
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
