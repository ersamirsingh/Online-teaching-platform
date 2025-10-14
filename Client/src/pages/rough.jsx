// import React, { useEffect, useRef } from "react";
// import { BookOpen, Rocket, Award, ArrowRight } from "lucide-react";
// import * as THREE from "three";

// // 🎨 Canvas Particle Background Component
// function CanvasBackground() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     let particles = [];
//     let animationFrameId;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.size = Math.random() * 2 + 0.5;
//         this.speedX = (Math.random() - 0.5) * 0.5;
//         this.speedY = (Math.random() - 0.5) * 0.5;
//       }
//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
//         if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
//       }
//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fillStyle = "rgba(255,255,255,0.7)";
//         ctx.fill();
//       }
//     }

//     const init = () => {
//       particles = [];
//       for (let i = 0; i < 100; i++) particles.push(new Particle());
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.update();
//         p.draw();
//       });
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     init();
//     animate();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 -z-10 w-full h-full"
//     />
//   );
// }

// // 🚀 Main Landing Page Component
// export default function TechBEELanding() {
//   const vantaRef = useRef(null);

//   useEffect(() => {
//     let vantaEffect;
//     (async () => {
//       const WAVES = (await import("vanta/dist/vanta.waves.min.js")).default;
//       vantaEffect = WAVES({
//         el: vantaRef.current,
//         THREE,
//         color: 0x6d28d9,
//         shininess: 50,
//         waveHeight: 20,
//         waveSpeed: 0.8,
//         zoom: 0.9,
//       });
//     })();

//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, []);

//   return (
//     <div
//       ref={vantaRef}
//       className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative text-white"
//     >
//       {/* 🌌 Canvas Particles */}
//       <CanvasBackground />

//       {/* 🟣 Animated Blobs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob top-0 -left-20" />
//         <div className="absolute w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 -right-20" />
//         <div className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-blob animation-delay-4000 -bottom-20 left-1/2" />
//       </div>

//       {/* 🎈 Floating Icons */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <BookOpen className="absolute top-20 left-10 text-white/20 w-16 h-16 animate-bounce-slow" />
//         <Rocket className="absolute top-1/3 right-16 text-white/20 w-14 h-14 animate-spin-slow" />
//         <Award className="absolute bottom-20 left-1/3 text-white/20 w-12 h-12 animate-bounce-slow" />
//       </div>

//       {/* ✨ Hero Section */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 sm:py-40 md:py-48">
//         <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
//           Welcome to <span className="text-yellow-300">TechBEE</span>
//         </h1>
//         <p className="text-base sm:text-lg md:text-2xl mb-8 max-w-2xl text-white/90">
//           Empowering learners with technology-driven education and innovation.
//         </p>
//         <button className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-300 transition">
//           Get Started <ArrowRight />
//         </button>
//       </div>

//       {/* 🔮 Custom Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0%, 100% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//         }
//         .animate-blob { animation: blob 8s infinite; }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }

//         @keyframes bounce-slow {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes spin-slow {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .animate-bounce-slow { animation: bounce-slow 6s infinite ease-in-out; }
//         .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//       `}</style>
//     </div>
//   );
// }



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


// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../store/authSlice";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";



// const registerSchema = z.object({
//   firstName: z.string().min(3, "Name should be at least 3 letters"),
//   emailId: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   contact: z.string().min(10, "Contact number must be at least 10 digits")
// });

// const Register = () => {


//    const [showPassword, setShowPassword] = useState(false);
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

//    useEffect(() => {
//       if (isAuthenticated) 
//          navigate("/");
//    }, [isAuthenticated, navigate]);

//    const {
//       register,
//       handleSubmit,
//       formState: { errors },
//    } = useForm({ resolver: zodResolver(registerSchema) });

//    const sendData = (data) => {
//       dispatch(registerUser(data));
//    };

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
//                {/* ✅ First Name */}
//                <div className="form-control">
//                <label className="label">
//                   <span className="label-text">First Name</span>
//                </label>
//                <input
//                   type="text"
//                   placeholder="John Doe"
//                   className={`input input-bordered w-full ${
//                      errors.firstName ? "input-error" : ""
//                   }`}
//                   {...register("firstName")}
//                />
//                {errors.firstName && (
//                   <span className="text-error text-sm mt-1">
//                      {errors.firstName.message}
//                   </span>
//                )}
//                </div>

//                {/* ✅ Email */}
//                <div className="form-control mt-4">
//                <label className="label">
//                   <span className="label-text">Email</span>
//                </label>
//                <input
//                   type="email"
//                   placeholder="john@example.com"
//                   className={`input input-bordered w-full ${
//                      errors.emailId ? "input-error" : ""
//                   }`}
//                   {...register("emailId")}
//                />
//                {errors.emailId && (
//                   <span className="text-error text-sm mt-1">
//                      {errors.emailId.message}
//                   </span>
//                )}
//                </div>

//                {/* ✅ Contact */}
//                <div className="form-control mt-4">
//                <label className="label">
//                   <span className="label-text">Contact</span>
//                </label>
//                <input
//                   type="text"
//                   placeholder="9876543210"
//                   className={`input input-bordered w-full ${
//                      errors.contact ? "input-error" : ""
//                   }`}
//                   {...register("contact")}
//                />
//                {errors.contact && (
//                   <span className="text-error text-sm mt-1">
//                      {errors.contact.message}
//                   </span>
//                )}
//                </div>

//                {/* ✅ Password */}
//                <div className="form-control mt-4">
//                <label className="label">
//                   <span className="label-text">Password</span>
//                </label>
//                <div className="relative">
//                   <input
//                      type={showPassword ? "text" : "password"}
//                      placeholder="Password"
//                      autoComplete="off"
//                      className={`input input-bordered w-full pr-10 ${
//                      errors.password ? "input-error" : ""
//                      }`}
//                      {...register("password")}
//                   />
//                   <button
//                      type="button"
//                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                      onClick={() => setShowPassword(!showPassword)}
//                      aria-label={showPassword ? "Hide password" : "Show password"}
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

//                {/* ✅ Submit Button */}
//                <div className="form-control mt-8 flex justify-center">
//                <button
//                   type="submit"
//                   className={`btn btn-primary ${loading ? "loading btn-disabled" : ""}`}
//                   disabled={loading}
//                >
//                   {loading ? (
//                      <>
//                      <span className="loading loading-spinner"></span>
//                      Registering...
//                      </>
//                   ) : (
//                      "Register"
//                   )}
//                </button>
//                </div>
//             </form>

//             <div className="text-center mt-6">
//                <span className="text-sm">
//                Already have an account?{" "}
//                <NavLink to="/login" className="link link-primary">
//                   Login
//                </NavLink>
//                </span>
//             </div>
//          </div>
//          </div>
//       </div>
//    );
// };

// export default Register;


