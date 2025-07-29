   import React, { useState, useEffect } from 'react';
   import { Link } from 'react-router-dom';
   import BackendAPI from './BackendAPI';
   import PageEditor from './PageEditor';

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
           const fetchedPages = await BackendAPI.getPages();
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
         const createdPage = await BackendAPI.createOrUpdatePage(newPage);
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
               <Link to="/dashboard">Dashboard</Link>
             </li>
             <li>
               <a href="#" onClick={() => setShowForm(true)}>Create New Page</a>
             </li>
             {pages.map(page => (
               <li key={page.id}>
                 <a href="#" onClick={() => handleSelectPage(page.id)}>{page.title}</a>
               </li>
             ))}
             <li>
               <a href="#" onClick={onLogout}>Logout</a>
             </li>
           </ul>
         </div>
         <div className="main-content">
           <h1>Welcome, {user.name}</h1>
           <p>Role: {user.role}</p>

           <div className="notification" style={{ opacity: notification.show ? 1 : 0 }}>
             {notification.message}
           </div>

           {showForm && (
             <div className="upload-form">
               <h2>Create New Page</h2>
               <form onSubmit={handleCreatePage}>
                 <div className="form-group">
                   <label>Page Title</label>
                   <input
                     type="text"
                     name="title"
                     value={newPage.title}
                     onChange={handleNewPageChange}
                     required
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
                   />
                 </div>
                 <button type="submit" className="submit-btn">
                   Create Page
                 </button>
               </form>
             </div>
           )}

           {selectedPage && (
             <PageEditor pageId={selectedPage} userRole={user.role} />
           )}

           {!selectedPage && !showForm && (
             <div style={{ marginTop: '2rem' }}>
               <h2>Your Pages</h2>
               {isLoading ? (
                 <p>Loading pages...</p>
               ) : pages.length === 0 ? (
                 <p>No pages created yet. Click "Create New Page" to get started.</p>
               ) : (
                 <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                   {pages.map(page => (
                     <li key={page.id} style={{ marginBottom: '1rem', padding: '1rem', background: 'white', borderRadius: '5px' }}>
                       <h3>{page.title}</h3>
                       <p>{page.description}</p>
                       <button onClick={() => handleSelectPage(page.id)} className="btn" style={{ marginTop: '0.5rem' }}>
                         Edit Page
                       </button>
                     </li>
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
   