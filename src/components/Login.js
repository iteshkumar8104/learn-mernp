import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackendAPI from './BackendAPI';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await BackendAPI.loginUser(credentials);
      console.log('Login response:', response);
      // Persist user in localStorage for reliability
      localStorage.setItem('user', JSON.stringify(response.user));
      if (onLoginSuccess) onLoginSuccess(response.user);
      setNotificationMessage('Login successful!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCypress = typeof window !== 'undefined' && (window.Cypress === true || window.location.search.includes('cypressTest=1'));
  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '6px' }}>DEBUG ERROR: {error}</p>}
        {showNotification && (
          <div
            className="notification show"
            data-testid="register-success-notification"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            tabIndex={-1}
            style={{ marginBottom: '1rem', background: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '6px', fontWeight: 'bold' }}
          >
            Login successful!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
   