import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackendAPI from './BackendAPI';
import PageEditor from './PageEditor';
import { motion } from 'framer-motion';

const Dashboard = ({ user, onLogout }) => {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newPage, setNewPage] = useState({
    title: '',
    content: ''
  });
  const [selectedPage, setSelectedPage] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const fetchedPages = await BackendAPI.fetchPages();
        setPages(fetchedPages);
      } catch (err) {
        setNotification({ show: true, message: 'Failed to load pages' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, []);

  const handleNewPageChange = (e) => {
    const { name, value } = e.target;
    setNewPage(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePage = async (e) => {
    e.preventDefault();
    try {
      const createdPage = await BackendAPI.savePage(newPage, user.token);
      setPages(prev => [...prev, createdPage]);
      setNewPage({ title: '', content: '' });
      setShowForm(false);
      setNotification({ show: true, message: 'Page created successfully!' });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    } catch (err) {
      setNotification({ show: true, message: err.message });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    }
  };

  const handleSelectPage = (pageId) => {
    setSelectedPage(pageId);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-white hover:text-purple-700 rounded-md px-3 py-2 transition duration-300">
              <motion.span whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
                Dashboard
              </motion.span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 hover:bg-white hover:text-purple-700 rounded-md px-3 py-2 transition duration-300 focus:outline-none"
            >
              <motion.span whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
                Create New Page
              </motion.span>
            </button>
          </li>
          {pages.map(page => (
            <li key={page._id}>
              <button
                onClick={() => handleSelectPage(page._id)}
                className="flex items-center space-x-2 hover:bg-white hover:text-purple-700 rounded-md px-3 py-2 transition duration-300 focus:outline-none"
              >
                <motion.span whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {page.title}
                </motion.span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 hover:bg-white hover:text-purple-700 rounded-md px-3 py-2 transition duration-300 focus:outline-none"
            >
              <motion.span whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
                Logout
              </motion.span>
            </button>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h1 className="font-poppins font-bold text-4xl text-purple-700 mb-2">Welcome, {user.name}</h1>
        <p className="text-lg text-gray-600 mb-6">Role: {user.role}</p>

        <motion.div
          className="notification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: notification.show ? 1 : 0, y: notification.show ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          style={{ pointerEvents: notification.show ? 'auto' : 'none' }}
        >
          {notification.message}
        </motion.div>

        {showForm && (
          <motion.div
            className="upload-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-poppins font-bold text-3xl text-purple-700 mb-6">Create New Page</h2>
            <form onSubmit={handleCreatePage}>
              <div className="form-group">
                <label>Page Title</label>
                <input
                  type="text"
                  name="title"
                  value={newPage.title}
                  onChange={handleNewPageChange}
                  required
                  className="border border-purple-300 rounded-lg p-3 mb-6 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={newPage.content}
                  onChange={handleNewPageChange}
                  required
                  rows="3"
                  className="border border-purple-300 rounded-lg p-3 mb-6 w-full focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
                />
              </div>
              <button type="submit" className="submit-btn">
                Create Page
              </button>
            </form>
          </motion.div>
        )}

        {selectedPage && (
          <PageEditor pageId={selectedPage} userRole={user.role} />
        )}

        {!selectedPage && !showForm && (
          <div style={{ marginTop: '2rem' }}>
            <h2 className="font-poppins font-bold text-3xl text-purple-700 mb-6">Your Pages</h2>
            {isLoading ? (
              <p>Loading pages...</p>
            ) : pages.length === 0 ? (
              <p>No pages created yet. Click "Create New Page" to get started.</p>
            ) : (
              <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                {pages.map(page => (
                  <motion.li
                    key={page._id}
                    style={{ marginBottom: '1rem', padding: '1rem', background: 'white', borderRadius: '5px' }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(167, 139, 250, 0.6)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <h3 className="font-semibold text-purple-700">{page.title}</h3>
                    <p>{page.content}</p>
                    <button onClick={() => handleSelectPage(page._id)} className="btn" style={{ marginTop: '0.5rem' }}>
                      Edit Page
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
   