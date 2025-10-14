import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import axiosClient from '../API/axiosClient';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router';

function Profile() {

   const [userInfo, setUserInfo] = useState(null);
   const [loading, setLoading] = useState(false);
   // const { loading } = useSelector(state => state.auth);

   useEffect(() => {
      fetchUserInfo();
   }, []);

   const fetchUserInfo = async () => {
      try {
         setLoading(true)
         const response = await axiosClient.get('/auth/user');
         // console.log(response.data)
         setUserInfo(response.data);
      } catch (error) {
         toast.error('Failed to fetch user information');
      } finally {
         setLoading(false);
      }
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }

   return (
      <>
         <Nav />
         <div className="min-h-screen bg-base-200 py-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative">
         <div className="container mx-auto px-4">
            {/* User Info Card */}
            <div className="card shadow-xl max-w-2xl mx-auto group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
               <div className="card-body">
               <h2 className="card-title text-2xl mb-6">Profile Information</h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <div>
                     <label className="text-sm opacity-70">Name</label>
                     <p className="text-lg font-medium">{userInfo?.firstName}</p>
                     </div>

                     <div>
                     <label className="text-sm opacity-70">Email</label>
                     <p className="text-lg font-medium">{userInfo?.emailId}</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div>
                     <label className="text-sm opacity-70">Contact</label>
                     <p className="text-lg font-medium">{userInfo?.contact}</p>
                     </div>

                     <div>
                     <label className="text-sm opacity-70">Role</label>
                     <p className="text-lg font-medium capitalize">
                        {userInfo?.role}
                     </p>
                     </div>
                  </div>
               </div>

               {/* Admin Controls */}
               {userInfo?.role === 'admin' && (
                  <div className="divider my-6">Admin Controls</div>
               )}

               {userInfo?.role === 'admin' && (
                  <div className="flex flex-wrap gap-4 mt-4">
                     <NavLink to="/admin">
                        <button className="btn btn-primary">Manage Courses</button>
                     </NavLink>
                     <NavLink to='/admin'>
                        <button className='btn btn-secondary'>Create Course</button>
                     </NavLink>
                  </div>
               )}
               </div>
            </div>
         </div>
         </div>
      </>
   );
}

export default Profile;
