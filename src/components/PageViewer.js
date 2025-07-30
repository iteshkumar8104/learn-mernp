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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 font-poppins">{page.title}</h1>
      <div className="mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      {page.mediaUrl && (
        page.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
          <img src={page.mediaUrl} alt="Media" className="max-w-[400px] rounded-lg shadow-md mb-4" />
        ) : (
          <a href={page.mediaUrl} target="_blank" rel="noopener noreferrer" className="text-purple-700 underline">View Media</a>
        )
      )}
    </div>
  );
};

export default PageViewer;
