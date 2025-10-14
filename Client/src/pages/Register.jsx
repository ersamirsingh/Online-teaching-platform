import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



const registerSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 letters"),
  emailId: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contact: z.string().min(10, "Contact number must be at least 10 digits")
});

const Register = () => {


   const [showPassword, setShowPassword] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isAuthenticated, loading, error } = useSelector(state => state.auth);

   useEffect(() => {
      if (isAuthenticated) 
         navigate("/");
   }, [isAuthenticated, navigate]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(registerSchema) });

   const sendData = (data) => {
      dispatch(registerUser(data));
   }
   
   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }

   return (

      <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
         <div className="card w-96 bg-base-100 shadow-xl">
         <div className="card-body">
            <h2 className="card-title justify-center text-3xl mb-6">TechBEE</h2>
            {error && (
               <div className="alert alert-error mb-4">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
               </svg>
               <span>{error}</span>
               </div>
            )}

            <form onSubmit={handleSubmit(sendData)}>
               {/* ✅ First Name */}
               <div className="form-control">
               <label className="label">
                  <span className="label-text">First Name</span>
               </label>
               <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${
                     errors.firstName ? "input-error" : ""
                  }`}
                  {...register("firstName")}
               />
               {errors.firstName && (
                  <span className="text-error text-sm mt-1">
                     {errors.firstName.message}
                  </span>
               )}
               </div>

               {/* ✅ Email */}
               <div className="form-control mt-4">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input
                  type="email"
                  placeholder="john@example.com"
                  className={`input input-bordered w-full ${
                     errors.emailId ? "input-error" : ""
                  }`}
                  {...register("emailId")}
               />
               {errors.emailId && (
                  <span className="text-error text-sm mt-1">
                     {errors.emailId.message}
                  </span>
               )}
               </div>

               {/* ✅ Contact */}
               <div className="form-control mt-4">
               <label className="label">
                  <span className="label-text">Contact</span>
               </label>
               <input
                  type="text"
                  placeholder="9876543210"
                  className={`input input-bordered w-full ${
                     errors.contact ? "input-error" : ""
                  }`}
                  {...register("contact")}
               />
               {errors.contact && (
                  <span className="text-error text-sm mt-1">
                     {errors.contact.message}
                  </span>
               )}
               </div>

               {/* ✅ Password */}
               <div className="form-control mt-4">
               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <div className="relative">
                  <input
                     type={showPassword ? "text" : "password"}
                     placeholder="Password"
                     autoComplete="off"
                     className={`input input-bordered w-full pr-10 ${
                     errors.password ? "input-error" : ""
                     }`}
                     {...register("password")}
                  />
                  <button
                     type="button"
                     className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                     onClick={() => setShowPassword(!showPassword)}
                     aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                     {showPassword ? (
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
                           d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                     </svg>
                     ) : (
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
                           d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                     </svg>
                     )}
                  </button>
               </div>
               {errors.password && (
                  <span className="text-error text-sm mt-1">
                     {errors.password.message}
                  </span>
               )}
               </div>

               {/* ✅ Submit Button */}
               <div className="form-control mt-8 flex justify-center">
               <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading btn-disabled" : ""}`}
                  disabled={loading}
               >
                  {loading ? (
                     <>
                     <span className="loading loading-spinner"></span>
                     Registering...
                     </>
                  ) : (
                     "Register"
                  )}
               </button>
               </div>
            </form>

            <div className="text-center mt-6">
               <span className="text-sm">
               Already have an account?{" "}
               <NavLink to="/login" className="link link-primary">
                  Login
               </NavLink>
               </span>
            </div>
         </div>
         </div>
      </div>
   );
};

export default Register;
