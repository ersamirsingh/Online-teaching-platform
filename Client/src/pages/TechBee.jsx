



import React, { useEffect, useRef } from "react";
import { BookOpen, Rocket, Award, ArrowRight, Laptop} from "lucide-react";
import * as THREE from "three";

import Header from "../components/Header";
import {Typewriter} from "react-simple-typewriter"


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
      <Header/>

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
                
                <Typewriter
                words={[
                  "Join thousands of students mastering new skills with expert-led courses, interactive learning, and real-world projects. 🚀",
                  "The roots of education are bitter, but the fruit is sweet.",
                  "Develop a passion for learning. If you do, you will never cease to grow. ⚡",
                  "Education is the movement from darkness to light. 🌍"
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={10}
                delaySpeed={1500}
              />

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
       <style jsx>{`
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
