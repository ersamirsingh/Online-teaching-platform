import React from 'react';
import axiosClient from '../API/axiosClient';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


export default function Course() {



   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const fetchCourses = async () => {

      try {
         setLoading(true);
         const response = await axiosClient.get('/course');
         // console.log(response.data.courses);
         setCourses(response.data.courses);
      } catch (error) {
         toast.error(error.message)
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCourses();
   }, []);



   // const fetchLesson = async()=>{

   //    try {
   //       setError(null)
   //       setLoading(false)
   //       const resoponse = await axiosClient.get('/lesson')

         
   //    } catch (error) {
   //       setError(error.message)
         
   //    }
   //    finally{

   //    }
   // }

   
   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-base-200">
         <Nav />
         <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative">
         <h2 className="text-3xl font-bold mb-8">Available Courses</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map(course => (
               <div key={course._id} className="group min-h-[150px] w-full bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
               <figure>
                  <img
                     src={course.thumbnail || 'https://placehold.co/600x400'}
                     alt={course.title}
                     className="h-48 w-full object-cover"
                  />
               </figure>
               <div className="card-body">
                  <h2 className="card-title">{course.title}</h2>
                  <p className="text-sm text-base-content/70">
                     {course.category}
                  </p>
                  <p className="line-clamp-3">{course.description}</p>
                  <div className="flex items-center justify-between mt-4">
                     <span className="text-lg font-semibold">
                     ₹{course.price.toLocaleString()}
                     </span>
                     <div className="card-actions">
                     <button className="btn btn-secondary" onClick={()=>navigate(`/lesson/${course._id}`)}>View Details</button>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-base-content/70">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                     />
                     </svg>
                     <span>{course.lessons?.length || 0} Lessons</span>
                     <span>•</span>
                     <span>{course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Date not available'}</span>
                     {/* <span><button className='btn' onClick={fetchLesson()}>View Lesson</button></span> */}
                  </div>
               </div>
               </div>
            ))}
         </div>
         </div>
      </div>
   );
}
