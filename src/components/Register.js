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
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white p-10 rounded-xl shadow-2xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold mb-8 text-purple-700 font-poppins text-center">Create an Account</h2>
        {error && <p className="bg-red-100 text-red-700 font-bold text-lg mb-4 p-3 rounded-lg">DEBUG ERROR: {error}</p>}
        {showNotification && (
          <div
            className="bg-green-100 text-green-700 font-bold text-lg mb-4 p-3 rounded-lg notification show"
            data-testid="register-success-notification"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            tabIndex={-1}
          >
            Registration successful! Please login.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-purple-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-purple-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-purple-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-purple-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account? <Link to="/login" className="text-purple-700 underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
   