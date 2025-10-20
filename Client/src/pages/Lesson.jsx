import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../API/axiosClient';
import Header from '../components/Header';





export default function Lesson() {

   const { courseId } = useParams();
   const [loading, setLoading] = useState(false);
   const [lessons, setLessons] = useState([]);

   const fetchLesson = async () => {

      try {
         setLoading(true);
         const response = await axiosClient.get(`/lesson/${courseId}`);
         setLessons(response.data.lessons || []);
      } catch (error) {
         console.error('Error fetching lessons:', error.message);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchLesson();
   }, [courseId]);

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
         <span className="loading loading-spinner loading-lg text-white"></span>
         </div>
      );
   }

   return (
      <>
         <div className="min-h-screen bg-base-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
            <Header/>
            <h1 className="text-4xl font-bold text-center mb-8">📚 Course Lessons</h1>

            {lessons.length === 0 ? (
               <p className="text-center text-lg">No lessons available for this course.</p>
            ) : (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessons.map((lesson) => (
                     <div
                        key={lesson._id}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-transform duration-300"
                     >
                        <h2 className="text-2xl font-semibold mb-2">{lesson.title}</h2>
                        <p className="text-sm text-gray-200 mb-4">
                           Duration: {lesson.duration} mins
                        </p>

                        <div className="mb-3">
                           <a
                              href={lesson.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 underline hover:text-blue-200 transition"
                           >
                           ▶ Watch Video
                           </a>
                        </div>

                        {lesson.resources && lesson.resources.length > 0 && (
                           <div>
                              <h3 className="font-semibold mb-1 text-gray-100">Resources:</h3>
                              <ul className="list-disc list-inside text-gray-200 text-sm">
                                 {lesson.resources.map((resource, index) => (
                                    <li key={index}>
                                       <a
                                          href={resource}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-300 hover:text-blue-200"
                                       >
                                          {resource}
                                       </a>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </>
   );
}
