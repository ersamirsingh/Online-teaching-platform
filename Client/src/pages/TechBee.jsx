// import React, { useState, useEffect } from 'react';
// import { BookOpen, Users, Award, TrendingUp, Video, MessageSquare } from 'lucide-react';

// export default function TechBEEDashboard() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: <BookOpen className="w-8 h-8" />,
//       title: "Interactive Courses",
//       description: "Access thousands of courses with interactive content and real-time feedback.",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Live Classes",
//       description: "Join live sessions with expert instructors and collaborate with peers.",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: "Certifications",
//       description: "Earn recognized certificates upon course completion to boost your career.",
//       gradient: "from-green-500 to-teal-500"
//     },
//     {
//       icon: <TrendingUp className="w-8 h-8" />,
//       title: "Progress Tracking",
//       description: "Monitor your learning journey with detailed analytics and insights.",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Video className="w-8 h-8" />,
//       title: "Video Library",
//       description: "Access unlimited HD video content available 24/7 at your convenience.",
//       gradient: "from-indigo-500 to-purple-500"
//     },
//     {
//       icon: <MessageSquare className="w-8 h-8" />,
//       title: "Community Support",
//       description: "Connect with learners worldwide and get help from our community.",
//       gradient: "from-pink-500 to-rose-500"
//     }
//   ];

//   const stats = [
//     { value: "50K+", label: "Active Students" },
//     { value: "1000+", label: "Courses" },
//     { value: "200+", label: "Expert Tutors" },
//     { value: "95%", label: "Success Rate" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-900 to-red-300 overflow-hidden">
//       {/* Animated Background Shapes */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div 
//           className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"
//           style={{ top: '10%', left: '10%', animationDelay: '0s' }}
//         />
//         <div 
//           className="absolute w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl animate-blob"
//           style={{ top: '60%', right: '10%', animationDelay: '2s' }}
//         />
//         <div 
//           className="absolute w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-blob"
//           style={{ bottom: '20%', left: '50%', animationDelay: '4s' }}
//         />
//       </div>

//       {/* Header */}
//       <header className="relative z-50 bg-white/10 backdrop-blur-lg shadow-lg">
//         <nav className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center space-x-3 group cursor-pointer">
//               <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-12">
//                 <span className="text-2xl animate-bounce">🐝</span>
//                 <div className="absolute inset-0 bg-yellow-400/50 rounded-full animate-ping" />
//               </div>
//               <span className="text-2xl font-bold text-white tracking-tight">
//                 TechBEE
//               </span>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex items-center space-x-4">
//               <button className="px-6 py-2 text-white font-semibold border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
//                 Login
//               </button>
//               <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
//                 Register
//               </button>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 container mx-auto px-6 py-16">
//         {/* Hero Section */}
//         <div className="text-center mb-20 animate-fadeInUp">
//           <h1 className="text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200">
//             Welcome to TechBEE
//           </h1>
//           <p className="text-xl text-white/90 max-w-2xl mx-auto">
//             Transform your learning experience with cutting-edge technology and expert instructors
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {stats.map((stat, index) => (
//             <div 
//               key={index}
//               className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/25 hover:shadow-2xl animate-fadeInUp"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
//               <div className="text-white/80 font-medium">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group bg-white/15 backdrop-blur-md rounded-3xl p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl animate-fadeInUp cursor-pointer"
//               style={{ animationDelay: `${index * 0.15}s` }}
//             >
//               <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12 group-hover:scale-110`}>
//                 {feature.icon}
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-white/80 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="mt-20 text-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
//           <button className="px-10 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
//             Start Learning Today
//           </button>
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes blob {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//           }
//           25% {
//             transform: translate(50px, 50px) scale(1.1);
//           }
//           50% {
//             transform: translate(0, 100px) scale(0.9);
//           }
//           75% {
//             transform: translate(-50px, 50px) scale(1.05);
//           }
//         }

//         .animate-fadeInUp {
//           animation: fadeInUp 1s ease-out forwards;
//         }

//         .animate-blob {
//           animation: blob 20s infinite ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }




import React, { useEffect, useRef } from "react";
import { BookOpen, Rocket, Award, ArrowRight, Laptop} from "lucide-react";
import * as THREE from "three";
import { NavLink } from "react-router";


function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.9;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  );
}

export default function TechBEELanding() {
  // const [scrollY, setScrollY] = useState(0);
  const vantaRef = useRef(null);
  
  useEffect(() => {
    let vantaEffect;
    (async () => {
      const WAVES = (await import("vanta/dist/vanta.waves.min.js")).default;
      vantaEffect = WAVES({
        el: vantaRef.current,
        THREE,
        color: 0x6d29d9,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 0.8,
        zoom: 0.9,
      });
    })();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);


  return (
    <div
      ref={vantaRef}
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative"
    >
      {/* 🪐 Canvas Particles */}
      <CanvasBackground/>

     {/* 🟣 Animated Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob top-0 -left-20" />
        <div className="absolute w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 -right-20" />
        <div className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-blob animation-delay-4000 -bottom-20 left-1/2" />
      </div>

      {/* 🎈 Floating Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <BookOpen className="absolute top-40 left-10 text-white/60 w-16 h-16 animate-bounce-slow" />
              <Laptop className="absolute top-1/5 right-170 text-white/40 w-14 h-14 animate-bounce-slow" />
              <Rocket className="absolute top-1/3 right-16 text-white/20 w-14 h-14 animate-spin-slow" />
              <Award className="absolute bottom-20 left-1/3 text-white/20 w-12 h-12 animate-bounce-slow" />
            </div>

      {/* 🌟 Header */}
      <header className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                <span className="text-3xl">🐝</span>
                <div className="absolute inset-0 bg-yellow-400/50 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">
                TechBEE
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <NavLink className="px-6 py-2.5 text-white font-semibold border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              to="/login"
              >Login</NavLink>
              <NavLink to = "/signup" className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-pink-500/50">
                Register
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* 🚀 Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeInUp">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Learn Smarter,
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Grow Faster
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                Join thousands of students mastering new skills with expert-led
                courses, interactive learning, and real-world projects.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="group px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start flex-wrap">
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-white">50K+</div>
                  <div className="text-white/80">Students</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-white">1000+</div>
                  <div className="text-white/80">Courses</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-white">95%</div>
                  <div className="text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="flex-1 relative animate-fadeInUp animation-delay-300">
              <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                {/* Card 1 */}
                <div className="group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Interactive Learning
                  </h3>
                  <p className="text-white/80">
                    Engage with hands-on projects and real-time feedback
                  </p>
                </div>

                {/* Card 2 */}
                <div className="group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer ml-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Fast Track Career
                  </h3>
                  <p className="text-white/80">
                    Get job-ready skills from industry experts
                  </p>
                </div>

                {/* Card 3 */}
                <div className="group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Certified Programs
                  </h3>
                  <p className="text-white/80">
                    Earn recognized certificates to showcase your skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 💫 Custom Animations */}
      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(-50px, 50px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(25px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-blob { animation: blob 20s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 6s infinite ease-in-out; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 8s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style> */}
       <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-bounce-slow { animation: bounce-slow 6s infinite ease-in-out; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
}
