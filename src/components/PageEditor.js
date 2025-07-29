import React, { useState, useEffect } from 'react';
import BackendAPI from './BackendAPI';

const PageEditor = ({ pageId, userRole }) => {
  const [page, setPage] = useState({ title: '', content: '', mediaUrl: '' });
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await BackendAPI.fetchPageById(pageId);
        setPage(data);
      } catch (err) {
        setNotification({ show: true, message: 'Failed to load page' });
      }
    };
    if (pageId) {
      fetchPage();
    }
  }, [pageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let mediaUrl = page.mediaUrl;
      if (file) {
        const uploadResult = await BackendAPI.uploadMedia(file, localStorage.getItem('token'));
        mediaUrl = uploadResult.url;
      }
      const pageData = { id: pageId, title: page.title, content: page.content, mediaUrl };
      await BackendAPI.savePage(pageData, localStorage.getItem('token'));
      setNotification({ show: true, message: 'Page saved successfully!' });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    } catch (err) {
      setNotification({ show: true, message: err.message });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    }
  };

  if (userRole !== 'admin') {
    return <p>You do not have permission to edit pages.</p>;
  }

  return (
    <div className="page-editor">
      <h2>Edit Page</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={page.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" value={page.content} onChange={handleChange} rows="5" required />
        </div>
        <div className="form-group">
          <label>Media Upload</label>
          <input type="file" onChange={handleFileChange} />
          {page.mediaUrl && (
            <div>
              <p>Current Media:</p>
              {page.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img src={page.mediaUrl} alt="Media" style={{ maxWidth: '200px' }} />
              ) : (
                <a href={page.mediaUrl} target="_blank" rel="noopener noreferrer">View Media</a>
              )}
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">Save</button>
      </form>
      {notification.show && <p className="notification">{notification.message}</p>}
    </div>
  );
};

export default PageEditor;
