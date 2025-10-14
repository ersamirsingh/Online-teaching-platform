import React, { useEffect, useRef } from "react";
import { BookOpen, Rocket, Award, ArrowRight } from "lucide-react";
import * as THREE from "three";

// 🎨 Canvas Particle Background Component
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
        this.speedX = (Math.random() - 0.5) * 0.5;
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

// 🚀 Main Landing Page Component
export default function TechBEELanding() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect;
    (async () => {
      const WAVES = (await import("vanta/dist/vanta.waves.min.js")).default;
      vantaEffect = WAVES({
        el: vantaRef.current,
        THREE,
        color: 0x6d28d9,
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
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative text-white"
    >
      {/* 🌌 Canvas Particles */}
      <CanvasBackground />

      {/* 🟣 Animated Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob top-0 -left-20" />
        <div className="absolute w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 -right-20" />
        <div className="absolute w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-blob animation-delay-4000 -bottom-20 left-1/2" />
      </div>

      {/* 🎈 Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-20 left-10 text-white/20 w-16 h-16 animate-bounce-slow" />
        <Rocket className="absolute top-1/3 right-16 text-white/20 w-14 h-14 animate-spin-slow" />
        <Award className="absolute bottom-20 left-1/3 text-white/20 w-12 h-12 animate-bounce-slow" />
      </div>

      {/* ✨ Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 sm:py-40 md:py-48">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg leading-tight">
          Welcome to <span className="text-yellow-300">TechBEE</span>
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-8 max-w-2xl text-white/90">
          Empowering learners with technology-driven education and innovation.
        </p>
        <button className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-300 transition">
          Get Started <ArrowRight />
        </button>
      </div>

      {/* 🔮 Custom Animations */}
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
          50% { transform: translateY(-20px); }
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
