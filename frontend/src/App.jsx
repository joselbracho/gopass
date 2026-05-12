import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { authService } from './services/api';
import styles from './styles/App.module.css';

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link to="/">Dashboard</Link>
            {user && <Link to="/admin">Admin</Link>}
          </div>
          <div className={styles.navAuth}>
            {user ? (
              <>
                <span className={styles.username}>Hello, {user.username}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
