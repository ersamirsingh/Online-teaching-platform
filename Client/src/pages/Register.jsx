import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-hot-toast';
import axiosClient from '../API/axiosClient';
import { registerUser } from '../store/authSlice';
import React from 'react';


const Register = () => {

   const [formData, setFormData] = useState({
      firstName: '',
      emailId: '',
      password: '',
   });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await axiosClient.post('/auth/register', formData);
         dispatch(registerUser(response.data));
         toast.success('Registration successful');
         navigate('/');
      } catch (error) {
         toast.error(error.response?.data?.message || 'Registration failed');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 py-12">
         <div className="card w-full max-w-md shadow-2xl bg-base-100">
         <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center">Register</h2>

            <div className="form-control">
               <label className="label">
               <span className="label-text">First Name</span>
               </label>
               <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={20}
               />
            </div>

            <div className="form-control">
               <label className="label">
               <span className="label-text">Email</span>
               </label>
               <input
                  type="email"
                  name="emailId"
                  placeholder="email"
                  className="input input-bordered"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="form-control">
               <label className="label">
               <span className="label-text">Password</span>
               </label>
               <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  pattern="(?=.*[A-Z])(?=.*\d).*"
                  title="Password must contain at least one uppercase letter and one number"
               />
            </div>

            <div className="form-control mt-6">
               <button
               className={`btn btn-primary ${loading ? 'loading' : ''}`}
               disabled={loading}
               >
               Register
               </button>
            </div>

            <p className="text-center mt-4">
               Already have an account?{' '}
               <Link to="/login" className="link link-primary">
               Login
               </Link>
            </p>
         </form>
         </div>
      </div>
   );
};

export default Register;
