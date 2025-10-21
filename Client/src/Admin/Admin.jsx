import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';




export default function Admin() {

   const [activeTab, setActiveTab] = useState('overview');
   const { loading } = useSelector(state => state.auth);
   const navigate = useNavigate();

   const adminActions = {
      courses: [
         {
            title: 'Create New Course',
            color:'bg-fuchsia-400',
            action: () => setActiveTab('create-course'),
         },
         {
            title: 'View All Courses',
            color: 'bg-cyan-500',
            action: () => navigate('/admin/viewcourses'),
         }
      ],
      quizzes: [
         {
            title: 'Create Quiz',
            color:'btn-primary',
            action: () => setActiveTab('create-quiz'),
         },
         {
            title: 'Edit Quizzes',
            color: 'btn-secondary',
            action: () => setActiveTab('edit-quiz'),
         },
         {
            title: 'View Quiz Results',
            color: 'bg-yellow-400',
            action: () => setActiveTab('quiz-results'),
         }
      ],
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-base-200">
         <Header />
         <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="stats shadow">
               <div className="stat">
               <div className="stat-title">Total Courses</div>
               {/* <div className="stat-value">{course.length}</div> */}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Course Management Card */}
            <div className="card shadow-xl group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
               <div className="card-body ">
               <h2 className="card-title text-seconday">Course Management</h2>
               <div className='flex text-center pt-20 gap-8'>
                  {adminActions.courses.map((action, index) => (
                     <div
                        key={index}
                        className={`${action.color} hover:text-white card w-full min-h-[100px] text-center flex justify-center`}
                        onClick={action.action}
                     >
                     {action.title}
                     </div>
                  ))}
               </div>
               </div>
            </div>

            {/* Quiz Management Card */}
            <div className="group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
               <div className="card-body">
               <h2 className="card-title text-accent">Quiz Management</h2>
               <div className="space-y-4">
                  {adminActions.quizzes.map((action, index) => (
                     <button
                        key={index}
                        className={`btn ${action.color} w-full`}
                        onClick={action.action}
                     >
                     {action.title}
                     </button>
                  ))}
               </div>
               </div>
            </div>
         </div>

         {/* Quick Stats */}
         <div className="stats shadow w-full mt-8">
            <div className="stat">
               <div className="stat-figure text-primary">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
               </svg>
               </div>
               <div className="stat-title">Total Students</div>
               <div className="stat-value text-primary">255</div>
               <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
               <div className="stat-figure text-secondary">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
               </svg>
               </div>
               <div className="stat-title">Active Courses</div>
               <div className="stat-value text-secondary">12</div>
               <div className="stat-desc">↗︎ 40% more than last month</div>
            </div>

            <div className="stat">
               <div className="stat-figure text-accent">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
               </svg>
               </div>
               <div className="stat-title">Active Quizzes</div>
               <div className="stat-value text-accent">15</div>
               <div className="stat-desc">↘︎ 90% completion rate</div>
            </div>
         </div>
         </div>
      </div>
   );
}
