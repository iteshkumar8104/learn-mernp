import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackendAPI from './BackendAPI';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  // Notification timeout in ms (longer for Cypress to catch)
  const NOTIFICATION_TIMEOUT = 5000;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await BackendAPI.registerUser(formData);
      setNotificationMessage('Registration successful! Please login.');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        window.location.assign('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCypress = typeof window !== 'undefined' && (window.Cypress === true || window.location.search.includes('cypressTest=1'));
  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
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
            Registration successful! Please login.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
   