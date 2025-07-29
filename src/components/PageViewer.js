import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackendAPI from './BackendAPI';

const PageViewer = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const data = await BackendAPI.fetchPageById(id);
        setPage(data);
      } catch (err) {
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [id]);

  if (loading) return <p>Loading page...</p>;
  if (error) return <p>{error}</p>;
  if (!page) return <p>Page not found</p>;

  return (
    <div className="page-viewer">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      {page.mediaUrl && (
        page.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
          <img src={page.mediaUrl} alt="Media" style={{ maxWidth: '400px' }} />
        ) : (
          <a href={page.mediaUrl} target="_blank" rel="noopener noreferrer">View Media</a>
        )
      )}
    </div>
  );
};

export default PageViewer;
