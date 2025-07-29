   import React, { useState } from 'react';
   import { Routes, Route, Link, Navigate } from 'react-router-dom';
   import Home from './Home';
   import Register from './Register';
   import Login from './Login';
   import Dashboard from './Dashboard';
   import PageViewer from './PageViewer';
   import BackendAPI from './BackendAPI';

   const App = () => {
     const [currentUser , setCurrentUser ] = useState(null);
     const [showNotification, setShowNotification] = useState(false);
     const [notificationMessage, setNotificationMessage] = useState('');

     const handleRegisterSuccess = () => {
       setNotificationMessage('Registration successful! Please login.');
       setShowNotification(true);
       setTimeout(() => {
         setShowNotification(false);
       }, 3000);
     };

     const handleLoginSuccess = (user) => {
       setCurrentUser (user);
     };

     const handleLogout = () => {
       setCurrentUser (null);
     };

     return (
       <div>
         <div className="notification" style={{ opacity: showNotification ? 1 : 0 }}>
           {notificationMessage}
         </div>
         
         <header>
           <div className="container header-container">
             <div className="logo">EduLearn</div>
             <nav>
               <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/courses">Courses</Link></li>
                 {currentUser  ? (
                   <li><Link to="/dashboard">Dashboard</Link></li>
                 ) : (
                   <>
                     <li><Link to="/register">Register</Link></li>
                     <li><Link to="/login">Login</Link></li>
                   </>
                 )}
               </ul>
             </nav>
           </div>
         </header>

         <main>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
             <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
             <Route path="/dashboard" element={currentUser  ? <Dashboard user={currentUser } onLogout={handleLogout} /> : <Navigate to="/login" />} />
             <Route path="/course/:id" element={<PageViewer />} />
             <Route path="/page/:id" element={<PageViewer />} />
           </Routes>
         </main>

         <footer>
           <div className="container">
             <p>&copy; 2023 EduLearn. All rights reserved.</p>
           </div>
         </footer>
       </div>
     );
   };

   export default App;
   