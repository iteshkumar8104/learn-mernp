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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-purple-700 font-poppins">Edit Page</h2>
      <form onSubmit={handleSave}>
        <div className="mb-6">
          <label className="block mb-3 font-semibold text-purple-700">Title</label>
          <input type="text" name="title" value={page.title} onChange={handleChange} required className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300" />
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-semibold text-purple-700">Content</label>
          <textarea name="content" value={page.content} onChange={handleChange} rows="5" required className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300" />
        </div>
        <div className="mb-6">
          <label className="block mb-3 font-semibold text-purple-700">Media Upload</label>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          {page.mediaUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Current Media:</p>
              {page.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img src={page.mediaUrl} alt="Media" className="max-w-[200px] rounded-lg shadow-md" />
              ) : (
                <a href={page.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">View Media</a>
              )}
            </div>
          )}
        </div>
        <button type="submit" className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">Save</button>
      </form>
      {notification.show && <p className="bg-purple-100 border border-purple-400 text-purple-800 px-6 py-4 rounded-lg relative mb-6 font-semibold shadow-md mt-6">{notification.message}</p>}
    </div>
  );
};

export default PageEditor;
