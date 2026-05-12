import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import styles from '../styles/App.module.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(form);
      navigate('/admin');
      window.location.reload(); // Refresh to update nav/auth state
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.gradientText}>GoPass Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label>Username</label>
          <input 
            type="text" 
            value={form.username} 
            onChange={e => setForm({...form, username: e.target.value})} 
            required 
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input 
            type="password" 
            value={form.password} 
            onChange={e => setForm({...form, password: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" className={`${styles.button} ${styles.primary} ${styles.fullWidth}`}>
          Enter
        </button>
      </form>
    </div>
  );
};

export default Login;
