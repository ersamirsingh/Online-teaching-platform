import React from 'react';
import { logoutUser } from '../store/authSlice';
import {useSelector ,useDispatch } from 'react-redux';
import { NavLink } from 'react-router';





export default function Nav() {


   const { user, loading } = useSelector((state) => state.auth);

   const dispatch = useDispatch();


   const handleLogout = () => {
      dispatch(logoutUser());
   };

   return (

      <nav className="navbar bg-base-100 shadow-lg px-4">

         <div className="flex-1 bg-center">
            <NavLink to="/" className="btn btn-ghost text-xl">TechBEE</NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/" className="btn btn-ghost rounded-2xl">Home</NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/course" className="btn btn-ghost rounded-2xl"> Course </NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/quiz" className="btn btn-ghost rounded-2xl"> Quiz </NavLink>
         </div>

         <div className="mr-6">
            <NavLink to="/subscription" className="btn btn-ghost rounded-2xl"> Subscription </NavLink>
         </div>

         <div className="flex-none gap-4">

            <div className="dropdown dropdown-end">
               <div tabIndex={0} className="btn btn-ghost rounded-2xl">
                  {user?.firstName}
               </div>
               <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                     <button 
                        onClick={handleLogout}
                        disabled={loading}
                     >Logout</button>
                  </li>
                  {user?.role == 'admin' && <li><NavLink to='/admin'>Admin</NavLink></li>}
                  {<li><NavLink to='/profile'>Profile</NavLink></li>}
               </ul>
            </div>
         </div>
      </nav>

   );
}