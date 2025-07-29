   import React from 'react';
   import { Link } from 'react-router-dom';

   const Home = () => {
     return (
       <div>
         <section className="hero">
           <div className="container">
             <h1>Welcome to EduLearn</h1>
             <p>Your gateway to knowledge and skill development through interactive courses and resources.</p>
             <Link to="/register" className="btn">Get Started</Link>
           </div>
         </section>

         <section className="courses">
           <div className="container">
             <div className="section-title">
               <h2>Featured Courses</h2>
               <p>Explore our top educational programs</p>
             </div>
             <div className="courses-grid">
               {[1, 2, 3].map((i) => (
                 <div className="course-card" key={i}>
                   <img 
                     className="course-img" 
                     src={`https://placehold.co/600x400?text=Course+${i}`} 
                     alt={`Educational course ${i} cover image showing ${i === 1 ? 'mathematics concepts' : i === 2 ? 'science laboratory' : 'literature books'}`}
                   />
                   <div className="course-info">
                     <h3>Course {i}</h3>
                     <p>This is a comprehensive course covering essential topics designed for all skill levels.</p>
                     <Link to={`/course/${i}`} className="btn">Learn More</Link>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
       </div>
     );
   };

   export default Home;
   