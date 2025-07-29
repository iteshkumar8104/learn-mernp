import React, { useState, useEffect } from 'react';
import BackendAPI from './BackendAPI';

const PageViewer = ({ pageId }) => {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const data = await BackendAPI.getPageContent(pageId);
        setPage(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [pageId]);

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!page) return <div className="container">No page found.</div>;

  return (
    <div className="container">
      <h2>{page.title}</h2>
      <p>{page.content}</p>
      <div style={{ marginTop: '2rem' }}>
        {page.media && page.media.length > 0 ? (
          page.media.map((url, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              {url.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={url} alt={`media-${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
              ) : (
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              )}
            </div>
          ))
        ) : (
          <p>No media available for this page.</p>
        )}
      </div>
    </div>
  );
};

export default PageViewer;
