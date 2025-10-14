import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axiosClient from '../API/axiosClient';






export default function Admin() {

   const [activeTab, setActiveTab] = useState('courses');
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(false)


   useEffect(() => {
      if (activeTab === 'courses') {
         fetchCourses();
      }
   }, [activeTab]);


   const fetchCourses = async () => {

      try {
         setLoading(true)
        const response = await axiosClient.get('/course');
         setCourses(response?.data?.courses);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
         toast.error('Failed to fetch courses');
      }
      finally{
         setLoading(false)
      }

   };

   // Course List Component
   const CourseList = () => (

      <div className="overflow-x-auto">
         <table className="table w-full">

            <thead>
               <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
               </tr>
            </thead>

            <tbody>
               {courses.map(course => (
                  <tr key={course._id}>
                  <td className='w-1/6'>{course.title}</td>
                  <td className='w-1/2'>{course.description}</td>
                  <td className='w-1/12'>{course.price}</td>
                  <td>{course.category}</td>
                  <td>
                     <div className="btn-group flex gap-x-12">
                        <button
                           className="btn btn-sm btn-info w-18"
                           // onClick={() => handleEdit(course)}
                        >
                        Edit
                        </button>
                        <button
                           className="btn btn-sm btn-error w-18"
                           // onClick={() => handleDelete(course._id)}
                        >
                        Delete
                        </button>
                     </div>
                  </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }


   return (
      <div className="min-h-screen bg-base-200">
         <div className="navbar bg-base-100">
         <div className="flex-1">
            <span className="text-xl font-bold">Admin Dashboard</span>
         </div>
         </div>

         <div className="drawer lg:drawer-open">
         <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

         {/* Sidebar */}
         <div className="drawer-side">
            <label htmlFor="admin-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
               <li className={activeTab === 'courses' ? 'bordered' : ''}>
                  <a onClick={() => setActiveTab('courses')}>Courses</a>
               </li>
            </ul>
         </div>

         {/* Content */}
         { <div className="drawer-content p-6">
            {activeTab === 'courses' && <CourseList />}
         </div> }
         </div>
      </div>
   );
}
