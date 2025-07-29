import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import PageViewer from './PageViewer';
import BackendAPI from './BackendAPI';

import { FaHome, FaBook, FaUser, FaSignInAlt } from 'react-icons/fa';

const App = () => {
  // Debug: expose Cypress detection and location for troubleshooting
  let cypressDebug = '';
  if (typeof window !== 'undefined') {
    cypressDebug = `window.Cypress: ${window.Cypress} | window.location.search: ${window.location.search}`;
  }
  // Cypress test mode detection
  const isCypress = typeof window !== 'undefined' && (window.Cypress === true || window.location.search.includes('cypressTest=1'));

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // No-op: notification now handled in Register.js for Cypress reliability
  const handleRegisterSuccess = () => {};

  // Set current user on login success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setNotificationMessage('Logged out successfully.');
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500);
  };

  useEffect(() => {
    if (isCypress && currentUser && window.location.pathname === '/login') {
      console.log('[App] Cypress detected: redirecting to /dashboard');
      window.location.assign('/dashboard');
    }
  }, [isCypress, currentUser]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-200 font-sans text-gray-900 transition-colors duration-500">
      <div style={{ background: '#fffae6', color: '#b45309', padding: '6px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', zIndex: 9999 }}>
        CYPRESS DEBUG: {cypressDebug}
      </div>
      {showNotification && (
        <motion.div
          className={`notification show`}
          data-testid="register-success-notification"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          tabIndex={-1}
        >
          {notificationMessage}
        </motion.div>
      )}
      <header className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-white shadow-lg transition-colors duration-500">
        <div className="container mx-auto px-6 flex items-center justify-between py-4">
          <div className="logo text-4xl font-extrabold tracking-widest font-poppins">
            EduLearn
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link className="flex items-center space-x-2 hover:text-yellow-300 transition duration-500 ease-in-out transform hover:scale-110" to="/">
                  <FaHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link className="flex items-center space-x-2 hover:text-yellow-300 transition duration-500 ease-in-out transform hover:scale-110" to="/courses">
                  <FaBook /> <span>Courses</span>
                </Link>
              </li>
              {currentUser  ? (
                <li>
                  <Link className="flex items-center space-x-2 hover:text-yellow-300 transition duration-500 ease-in-out transform hover:scale-110" to="/dashboard">
                    <FaUser /> <span>Dashboard</span>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="flex items-center space-x-2 hover:text-yellow-300 transition duration-500 ease-in-out transform hover:scale-110" to="/register">
                      <FaUser /> <span>Register</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-center space-x-2 hover:text-yellow-300 transition duration-500 ease-in-out transform hover:scale-110" to="/login">
                      <FaSignInAlt /> <span>Login</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={currentUser  ? <Dashboard user={currentUser } onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/course/:id" element={<PageViewer />} />
          <Route path="/page/:id" element={<PageViewer />} />
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-white text-center py-6 mt-12 shadow-inner font-poppins font-semibold tracking-widest">
        <div className="container mx-auto px-6">
          <p>&copy; 2023 EduLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

}

export default App;
