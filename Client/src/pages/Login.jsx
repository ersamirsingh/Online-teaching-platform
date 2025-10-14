// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { loginUser } from '../store/authSlice'
// import { useEffect, useState } from 'react';
// import React from 'react';

// const loginSchema = z.object({
//   emailId: z.string().email('Invalid Email'),
//   password: z.string()
// });

// function Login() {

//    const [showPassword, setShowPassword] = useState(false);
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const { isAuthenticated, loading, error } = useSelector(state => state.auth);
//    const {
//       register,
//       handleSubmit,
//       formState: { errors },
//    } = useForm({ resolver: zodResolver(loginSchema) }); // Using renamed schema

//    useEffect(() => {
//       if (isAuthenticated) {
//          navigate('/');
//       }
//    }, [isAuthenticated, navigate]);

//    const sendData = data => {
//       // console.log(data)
//       dispatch(loginUser(data));
//    };

//   // console.log(error)

//    return (
//       <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
//          <div className="card w-96 bg-base-100 shadow-xl">
//          <div className="card-body">

//             <h2 className="card-title justify-center text-3xl mb-6">TechBEE</h2>
//             {error && (
//                <div className="alert alert-error mb-4">
//                <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="stroke-current shrink-0 h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                >
//                   <path
//                      strokeLinecap="round"
//                      strokeLinejoin="round"
//                      strokeWidth="2"
//                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                </svg>
//                <span>{error}</span>
//                </div>
//             )}

//             <form onSubmit={handleSubmit(sendData)}>
//                <div className="form-control">
//                {' '}
//                {/* Removed mt-4 from first form-control for tighter spacing to title or global error */}
//                <label className="label">
//                   {' '}
//                   {/* Removed mb-1, default spacing should be fine */}
//                   <span className="label-text">Email</span>
//                </label>
//                <input
//                   type="email"
//                   placeholder="john@example.com"
//                   className={`input input-bordered w-full ${
//                      errors.emailId ? 'input-error' : ''
//                   }`}
//                   {...register('emailId')}
//                />
//                {errors.emailId && (
//                   <span className="text-error text-sm mt-1">
//                      {errors.emailId.message}
//                   </span>
//                )}
//                </div>

//                <div className="form-control mt-4">
//                <label className="label">
//                   <span className="label-text">Password</span>
//                </label>
//                <div className="relative">
//                   <input
//                      type={showPassword ? 'text' : 'password'}
//                      placeholder="password"
//                      autoComplete='YourName#987!'
//                      className={`input input-bordered w-full pr-10 ${
//                         errors.password ? 'input-error' : ''
//                      }`}
//                      {...register('password')}
//                   />
//                   <button
//                      type="button"
//                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                      onClick={() => setShowPassword(!showPassword)}
//                      aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                      {showPassword ? (
//                      <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                      >
//                         <path
//                            strokeLinecap="round"
//                            strokeLinejoin="round"
//                            strokeWidth={2}
//                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                         />
//                      </svg>
//                      ) : (
//                      <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                      >
//                         <path
//                            strokeLinecap="round"
//                            strokeLinejoin="round"
//                            strokeWidth={2}
//                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                         <path
//                            strokeLinecap="round"
//                            strokeLinejoin="round"
//                            strokeWidth={2}
//                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                         />
//                      </svg>
//                      )}
//                   </button>
//                </div>
//                {errors.password && (
//                   <span className="text-error text-sm mt-1">
//                      {errors.password.message}
//                   </span>
//                )}
//                </div>

//                <div className="form-control mt-8 flex justify-center">
//                <button
//                   type="submit"
//                   className={`btn btn-primary ${
//                      loading ? 'loading btn-disabled' : ''
//                   }`}
//                   disabled={loading}
//                >
//                   {loading ? (
//                      <>
//                      <span className="loading loading-spinner"></span>
//                      Logging in...
//                      </>
//                   ) : (
//                      'Login'
//                   )}
//                </button>
//                </div>
//             </form>
//             <div className="text-center mt-6">
//                <span className="text-sm">
//                Don't have an account?{' '}
//                <NavLink to="/signup" className="link link-primary">
//                   Sign Up
//                </NavLink>
//                </span>
//             </div>
//          </div>
//          </div>
//       </div>
//    );
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { loginUser } from '../store/authSlice';

const loginSchema = z.object({
  emailId: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const sendData = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20"
      >
        {/* Logo & Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-4xl font-extrabold text-white mb-8"
        >
          TechBEE 🔐
        </motion.h2>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 mb-4 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(sendData)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white/90 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full input input-bordered focus:outline-none bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl py-3 px-4 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                errors.emailId ? 'border-red-400' : ''
              }`}
              {...register('emailId')}
            />
            {errors.emailId && (
              <p className="text-red-300 text-sm mt-1">{errors.emailId.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/90 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full input input-bordered bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl py-3 px-4 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? 'border-red-400' : ''
                }`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white transition"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
              loading
                ? 'bg-blue-400/40 cursor-not-allowed text-white/80'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-blue-600/40'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {/* Signup Redirect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-white/80"
        >
          <span>Don’t have an account? </span>
          <NavLink
            to="/signup"
            className="text-blue-300 hover:text-blue-400 underline transition-all duration-200"
          >
            Sign Up
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
