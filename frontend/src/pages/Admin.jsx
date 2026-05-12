import React, { useEffect, useState } from 'react';
import { projectService, taskService } from '../services/api';
import styles from '../styles/App.module.css';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  
  // Task form state
  const [taskForm, setTaskForm] = useState({ title: '', description: '', priority: 'MEDIUM', status: 'TODO' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await projectService.getAll();
    setProjects(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await projectService.update(editingId, form);
      } else {
        await projectService.create(form);
      }
      setForm({ name: '', description: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleEdit = (project) => {
    setForm({ name: project.name, description: project.description });
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await projectService.delete(id);
      fetchProjects();
    }
  };

  // Task Management
  const handleTaskSubmit = async (e, projectId) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await taskService.update(editingTaskId, taskForm);
      } else {
        await taskService.create({ ...taskForm, projectId });
      }
      setTaskForm({ title: '', description: '', priority: 'MEDIUM', status: 'TODO' });
      setEditingTaskId(null);
      fetchProjects();
    } catch (err) {
      setError('Error managing task');
    }
  };

  const handleTaskEdit = (task) => {
    setTaskForm({ title: task.title, description: task.description, priority: task.priority, status: task.status });
    setEditingTaskId(task.id);
  };

  const handleTaskDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await taskService.delete(id);
      fetchProjects();
    }
  };

  return (
    <div>
      <h1 className={styles.gradientText}>Admin - Project Management</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }} className={styles.card}>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <input 
            type="text" 
            placeholder="Project Name" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            required 
          />
          <textarea 
            placeholder="Description" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            required
          />
          <button type="submit" className={`${styles.button} ${styles.primary}`}>
            {editingId ? 'Update Project' : 'Create Project'}
          </button>
          {editingId && <button onClick={() => {setEditingId(null); setForm({name:'', description:''})}} className={styles.button}>Cancel</button>}
        </div>
      </form>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <React.Fragment key={p.id}>
                <tr>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>
                    <button onClick={() => setExpandedProjectId(expandedProjectId === p.id ? null : p.id)} className={styles.button}>
                      {expandedProjectId === p.id ? 'Hide Tasks' : 'Manage Tasks'}
                    </button>
                    <button onClick={() => handleEdit(p)} className={styles.button}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} className={`${styles.button} ${styles.danger}`}>Delete</button>
                  </td>
                </tr>
                {expandedProjectId === p.id && (
                  <tr>
                    <td colSpan="3" className={styles.expandedRow}>
                      <div className={styles.taskManager}>
                        <h4>Tasks for {p.name}</h4>
                        
                        <form onSubmit={(e) => handleTaskSubmit(e, p.id)} className={styles.taskFormInline}>
                          <input 
                            type="text" 
                            placeholder="Task Title" 
                            value={taskForm.title} 
                            onChange={e => setTaskForm({...taskForm, title: e.target.value})} 
                            required 
                          />
                          <select 
                            value={taskForm.priority} 
                            onChange={e => setTaskForm({...taskForm, priority: e.target.value})}
                          >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                          </select>
                          <select 
                            value={taskForm.status} 
                            onChange={e => setTaskForm({...taskForm, status: e.target.value})}
                          >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN WORK</option>
                            <option value="DONE">DONE</option>
                          </select>
                          <button type="submit" className={`${styles.button} ${styles.primary}`}>
                            {editingTaskId ? 'Update' : 'Add Task'}
                          </button>
                          {editingTaskId && <button onClick={() => {setEditingTaskId(null); setTaskForm({title:'', description:'', priority:'MEDIUM', status:'TODO'})}} className={styles.button}>Cancel</button>}
                        </form>

                        <div className={styles.adminTaskList}>
                          {p.tasks?.map(t => (
                            <div key={t.id} className={styles.adminTaskItem}>
                              <span onClick={() => handleTaskEdit(t)} style={{ cursor: 'pointer', flexGrow: 1 }}>
                                <strong>{t.title}</strong> ({t.priority}) - {t.status}
                              </span>
                              <div>
                                <button onClick={() => handleTaskEdit(t)} className={styles.button}>Edit</button>
                                <button onClick={() => handleTaskDelete(t.id)} className={`${styles.button} ${styles.danger}`}>Del</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
