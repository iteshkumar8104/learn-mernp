   import React from 'react';
   import { Link } from 'react-router-dom';

   const Home = () => {
     return (
       <div>
         <section className="bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-200 py-16">
           <div className="max-w-7xl mx-auto px-6 text-center">
             <h1 className="text-5xl font-extrabold text-purple-700 mb-6 font-poppins">Welcome to EduLearn</h1>
             <p className="text-lg text-gray-700 mb-8">Your gateway to knowledge and skill development through interactive courses and resources.</p>
             <Link to="/register" className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">Get Started</Link>
           </div>
         </section>

         <section className="py-16 bg-white">
           <div className="max-w-7xl mx-auto px-6">
             <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold mb-4 text-purple-700 font-poppins">Featured Courses</h2>
               <p className="text-lg text-gray-600">Explore our top educational programs</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map((i) => (
                 <div className="bg-purple-100 rounded-xl shadow-lg overflow-hidden flex flex-col" key={i}>
                   <img 
                     className="w-full h-48 object-cover" 
                     src={`https://placehold.co/600x400?text=Course+${i}`} 
                     alt={`Educational course ${i} cover image showing ${i === 1 ? 'mathematics concepts' : i === 2 ? 'science laboratory' : 'literature books'}`}
                   />
                   <div className="p-6 flex-1 flex flex-col justify-between">
                     <h3 className="text-xl font-semibold text-purple-700 mb-2">Course {i}</h3>
                     <p className="text-gray-700 mb-4">This is a comprehensive course covering essential topics designed for all skill levels.</p>
                     <Link to={`/course/${i}`} className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl mt-auto">Learn More</Link>
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
   