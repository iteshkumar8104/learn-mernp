import React, { useState, useEffect } from 'react';
import BackendAPI from './BackendAPI';

const PageEditor = ({ pageId, userRole }) => {
  const [page, setPage] = useState({ title: '', content: '', media: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchPage = async () => {
      if (!pageId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const data = await BackendAPI.getPageById(pageId);
        setPage({ title: data.title, content: data.content, media: data.media || [] });
      } catch (err) {
        setNotification({ show: true, message: 'Failed to load page' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPage(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await BackendAPI.uploadMedia(file);
      setPage(prev => ({ ...prev, media: [...prev.media, res.url] }));
      setNotification({ show: true, message: 'Media uploaded successfully' });
    } catch (err) {
      setNotification({ show: true, message: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const pageData = { id: pageId, title: page.title, content: page.content, media: page.media };
      await BackendAPI.createOrUpdatePage(pageData);
      setNotification({ show: true, message: 'Page saved successfully' });
    } catch (err) {
      setNotification({ show: true, message: err.message });
    }
  };

  if (userRole !== 'admin') {
    return <p>You do not have permission to edit pages.</p>;
  }

  if (isLoading) {
    return <p>Loading page...</p>;
  }

  return (
    <div className="page-editor">
      <h2>Edit Page</h2>
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={page.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea name="content" value={page.content} onChange={handleChange} rows="6" required />
      </div>
      <div className="form-group">
        <label>Upload Media</label>
        <input type="file" onChange={handleFileChange} disabled={uploading} />
      </div>
      <div className="media-preview">
        {page.media.map((url, index) => (
          <div key={index} className="media-item">
            {url.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img src={url} alt={`media-${index}`} style={{ maxWidth: '200px' }} />
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="submit-btn">Save Page</button>
      {notification.show && <p className="notification">{notification.message}</p>}
    </div>
  );
};

export default PageEditor;
