   import React, { useState } from 'react';
   import { Link } from 'react-router-dom';
   import BackendAPI from './BackendAPI';

   const Login = ({ onLoginSuccess }) => {
     const [credentials, setCredentials] = useState({
       email: '',
       password: ''
     });
     const [error, setError] = useState(null);
     const [isSubmitting, setIsSubmitting] = useState(false);

     const handleChange = (e) => {
       const { name, value } = e.target;
       setCredentials(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       setIsSubmitting(true);
       setError(null);
       try {
         const user = await BackendAPI.loginUser (credentials.email, credentials.password);
         onLoginSuccess(user);
       } catch (err) {
         setError(err.message);
       } finally {
         setIsSubmitting(false);
       }
     };

     return (
       <div className="container">
         <div className="form-container">
           <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h2>
           {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
           <form onSubmit={handleSubmit}>
             <div className="form-group">
               <label>Email</label>
               <input
                 type="email"
                 name="email"
                 value={credentials.email}
                 onChange={handleChange}
                 required
               />
             </div>
             <div className="form-group">
               <label>Password</label>
               <input
                 type="password"
                 name="password"
                 value={credentials.password}
                 onChange={handleChange}
                 required
               />
             </div>
             <button type="submit" className="submit-btn" disabled={isSubmitting}>
               {isSubmitting ? 'Logging in...' : 'Login'}
             </button>
           </form>
           <p style={{ marginTop: '1rem', textAlign: 'center' }}>
             Don't have an account? <Link to="/register">Register here</Link>
           </p>
         </div>
       </div>
     );
   };

   export default Login;
   