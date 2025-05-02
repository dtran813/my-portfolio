import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrolling } from "@/hooks/useScrolling";
import { Mail, Download, Github, Linkedin, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";

export default function EnhancedHeroSection() {
  const { darkMode, accentColor, borderColor } = useTheme();
  const { scrollToSection } = useScrolling();
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Animation on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Calculate parallax effect based on mouse position and scroll
  const parallaxStyle = (depth) => {
    if (!heroRef.current) return {};
    
    const bounds = heroRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    // Calculate mouse-based parallax
    const moveX = ((mousePosition.x - centerX) / (bounds.width / 2)) * depth;
    const moveY = ((mousePosition.y - centerY) / (bounds.height / 2)) * depth;
    
    // Add scroll-based parallax
    const scrollOffset = scrollY * 0.1 * (depth / 20);
    
    return {
      transform: `translate(${moveX}px, ${moveY - scrollOffset}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };
  
  // 3D Rotation effect based on mouse position
  const get3DRotationStyle = () => {
    if (!heroRef.current) return {};
    
    const bounds = heroRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    // Calculate rotation angles
    const rotateY = ((mousePosition.x - centerX) / (bounds.width / 2)) * 5; // Max 5 degrees
    const rotateX = -((mousePosition.y - centerY) / (bounds.height / 2)) * 5; // Max 5 degrees
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.2s ease-out',
    };
  };
  
  // Generate random particles
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 1; // 1-5px
      const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
      const delay = Math.random() * 5; // 0-5s delay
      const duration = Math.random() * 10 + 10; // 10-20s duration
      const positionX = Math.random() * 100; // 0-100%
      const positionY = Math.random() * 100; // 0-100%
      
      return {
        id: i,
        size,
        opacity,
        delay,
        duration,
        positionX,
        positionY,
      };
    });
  };
  
  // Particles for background
  const particles = generateParticles(60);
  
  return (
    <section
      id="hero"
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center pt-16 pb-16 overflow-hidden relative ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Animated Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${
              darkMode ? "bg-indigo-500" : "bg-indigo-600"
            }`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              left: `${particle.positionX}%`,
              top: `${particle.positionY}%`,
              animation: `floatParticle ${particle.duration}s infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated gradient spheres */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,1) 0%, rgba(79,70,229,0) 70%)",
          top: "10%",
          right: "10%",
          ...parallaxStyle(-15),
        }}
      />
      
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,1) 0%, rgba(99,102,241,0) 70%)",
          bottom: "5%",
          left: "10%",
          ...parallaxStyle(-10),
        }}
      />
      
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(129,140,248,1) 0%, rgba(129,140,248,0) 70%)",
          top: "30%",
          left: "5%",
          ...parallaxStyle(-20),
        }}
      />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`grid-col-${i}`}
            className={`h-full border-r ${borderColor}`}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`grid-row-${i}`}
            className={`w-full border-b ${borderColor} absolute left-0 right-0`}
            style={{ top: `${(i + 1) * 8.33}%` }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          {/* Left side: Creative text with 3D effect */}
          <div className="space-y-8">
            {/* Status indicator */}
            <div
              className={`inline-block px-4 py-2 rounded-full ${
                darkMode ? "bg-indigo-500/10" : "bg-indigo-100"
              } font-medium text-sm ${accentColor} mb-0`}
              style={{
                boxShadow: darkMode ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none',
                animation: 'pulse 2s infinite',
              }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-ping" />
              <span>Online & Coding</span>
            </div>
            
            {/* Main heading with 3D effect */}
            <div 
              className="space-y-4"
              style={get3DRotationStyle()}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <div className="overflow-hidden">
                  <span 
                    className="block transform transition-transform duration-1000"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                      transitionDelay: '0.2s',
                    }}
                  >
                    Hello, I'm
                  </span>
                </div>
                <div className="overflow-hidden mt-2">
                  <span 
                    className={`block transform transition-transform duration-1000 ${accentColor}`}
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                      transitionDelay: '0.4s',
                    }}
                  >
                    <span className="relative">
                      Hoa Tran
                      <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-500/20 -z-10 rounded-full" />
                    </span>
                  </span>
                </div>
                <div className="overflow-hidden mt-2">
                  <span 
                    className="block transform transition-transform duration-1000"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                      transitionDelay: '0.6s',
                    }}
                  >
                    I create digital
                  </span>
                </div>
                <div className="overflow-hidden mt-2">
                  <span 
                    className="block transform transition-transform duration-1000"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                      transitionDelay: '0.8s',
                    }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                      experiences
                    </span>
                  </span>
                </div>
              </h1>
            </div>
            
            {/* Description */}
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } max-w-xl`}
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s ease-out, transform 1s ease-out',
                transitionDelay: '1s',
              }}
            >
              A software engineer with a creative edge, crafting elegant solutions 
              and immersive interfaces. I transform concepts into impactful digital 
              realities.
            </p>
            
            {/* Action buttons */}
            <div 
              className="flex flex-wrap gap-4 mt-8"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 1s ease-out, transform 1s ease-out',
                transitionDelay: '1.2s',
              }}
            >
              <button
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium overflow-hidden rounded-lg"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-indigo-600 rounded-full group-hover:w-80 group-hover:h-80"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative flex items-center justify-center text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                  <Mail className="mr-2" size={18} />
                  Start a Project
                </span>
              </button>
              
              <button
                className={`group relative inline-flex items-center justify-center px-8 py-4 text-indigo-600 font-medium overflow-hidden rounded-lg border ${borderColor}`}
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-indigo-100 rounded-full group-hover:w-80 group-hover:h-80"></span>
                <span className="relative flex items-center justify-center transition-colors duration-300 ease-in-out">
                  <Download className="mr-2" size={18} />
                  Download CV
                </span>
              </button>
            </div>
            
            {/* Social links */}
            <div 
              className="flex items-center space-x-6 pt-4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 1s ease-out',
                transitionDelay: '1.4s',
              }}
            >
              <a
                href={SITE_CONFIG.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={`group flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-indigo-600"
                } transition-colors`}
              >
                <Github
                  size={20}
                  className="mr-2 group-hover:scale-125 transition-transform"
                />
                <span className="relative overflow-hidden">
                  <span className="group-hover:translate-y-full transition-transform inline-block">
                    GitHub
                  </span>
                  <span className="absolute top-0 left-0 -translate-y-full group-hover:translate-y-0 transition-transform inline-block text-indigo-400">
                    @dtran813
                  </span>
                </span>
              </a>
              
              <a
                href={SITE_CONFIG.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={`group flex items-center ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-indigo-600"
                } transition-colors`}
              >
                <Linkedin
                  size={20}
                  className="mr-2 group-hover:scale-125 transition-transform"
                />
                <span className="relative overflow-hidden">
                  <span className="group-hover:translate-y-full transition-transform inline-block">
                    LinkedIn
                  </span>
                  <span className="absolute top-0 left-0 -translate-y-full group-hover:translate-y-0 transition-transform inline-block text-indigo-400">
                    Connect
                  </span>
                </span>
              </a>
            </div>
          </div>
          
          {/* Right side: Interactive 3D visualization */}
          <div className="relative">
            {/* 3D Animated shape */}
            <div 
              className="perspective-container relative aspect-square w-full max-w-md mx-auto"
              style={get3DRotationStyle()}
            >
              {/* Sphere with rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer blurred gradient circle */}
                <div 
                  className={`absolute w-full h-full rounded-full ${
                    darkMode ? "bg-indigo-600/5" : "bg-indigo-100/40"
                  } animate-pulse-slow`}
                  style={{
                    ...parallaxStyle(-5),
                    animationDuration: '4s'
                  }}
                />
                
                {/* Rotating rings */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={`ring-${i}`}
                    className={`absolute rounded-full border ${borderColor} opacity-60`}
                    style={{
                      width: `${100 - i * 15}%`,
                      height: `${100 - i * 15}%`,
                      borderWidth: '1px',
                      transform: `rotateX(${60 + i * 10}deg) rotateY(${i * 45}deg)`,
                      animation: `spin-${i % 2 === 0 ? 'clockwise' : 'counter-clockwise'} ${20 + i * 5}s linear infinite`,
                    }}
                  />
                ))}
                
                {/* Central sphere */}
                <div 
                  className={`relative w-1/2 h-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl flex items-center justify-center z-10`}
                  style={{
                    ...parallaxStyle(-2),
                    boxShadow: darkMode 
                      ? '0 0 40px rgba(99,102,241,0.3), inset 0 0 20px rgba(255,255,255,0.1)' 
                      : '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), inset 0 0 20px rgba(255,255,255,0.5)'
                  }}
                >
                  {/* Inner highlight */}
                  <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 rounded-full bg-white opacity-50 blur-sm" />
                </div>
                
                {/* Orbiting tech icons */}
                {[
                  { name: "React", angle: 0, distance: 65, color: "text-blue-400" },
                  { name: "Node", angle: 72, distance: 65, color: "text-green-500" },
                  { name: "TS", angle: 144, distance: 65, color: "text-blue-500" },
                  { name: "UI", angle: 216, distance: 65, color: "text-purple-500" },
                  { name: "AWS", angle: 288, distance: 65, color: "text-yellow-500" },
                ].map((tech, i) => (
                  <div
                    key={tech.name}
                    className={`absolute flex items-center justify-center ${tech.color} font-bold text-xs animate-orbit`}
                    style={{
                      "--orbit-angle": `${tech.angle}deg`,
                      "--orbit-distance": `${tech.distance}%`,
                      animation: `orbit 15s linear infinite`,
                      animationDelay: `${i * -3}s`,
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } shadow-lg flex items-center justify-center`}
                    >
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Floating geometric shapes */}
              <div
                className={`absolute w-16 h-16 border-2 ${
                  darkMode ? "border-indigo-500/20" : "border-indigo-500/30"
                } rounded-lg rotate-12`}
                style={{
                  top: "10%",
                  left: "0%",
                  ...parallaxStyle(-15),
                  animation: 'float 6s ease-in-out infinite',
                }}
              />
              <div
                className={`absolute w-8 h-8 ${
                  darkMode ? "bg-purple-500/10" : "bg-purple-500/20"
                } rounded-full`}
                style={{
                  top: "20%",
                  right: "10%",
                  ...parallaxStyle(-25),
                  animation: 'float 8s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              />
              <div
                className={`absolute w-12 h-12 border-2 ${
                  darkMode ? "border-blue-500/20" : "border-blue-500/30"
                } rounded-full`}
                style={{
                  bottom: "15%",
                  right: "20%",
                  ...parallaxStyle(-20),
                  animation: 'float 7s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              />
              
              {/* Code snippets floating */}
              <div
                className={`absolute font-mono text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } p-2 border ${borderColor} rounded-lg`}
                style={{
                  top: "40%",
                  right: "5%",
                  ...parallaxStyle(-10),
                  animation: 'float 10s ease-in-out infinite',
                  backdropFilter: 'blur(8px)',
                  background: darkMode ? 'rgba(30,30,30,0.5)' : 'rgba(255,255,255,0.5)',
                }}
              >
                {"<WebDev>...passion</WebDev>"}
              </div>
              <div
                className={`absolute font-mono text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } p-2 border ${borderColor} rounded-lg`}
                style={{
                  bottom: "20%",
                  left: "10%",
                  ...parallaxStyle(-8),
                  animation: 'float 9s ease-in-out infinite',
                  animationDelay: '1.5s',
                  backdropFilter: 'blur(8px)',
                  background: darkMode ? 'rgba(30,30,30,0.5)' : 'rgba(255,255,255,0.5)',
                }}
              >
                {"{creativity: true}"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => scrollToSection("about")}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 1s ease-out',
            transitionDelay: '1.6s',
          }}
        >
          <div
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover My Story
          </div>
          <div className="relative w-8 h-12 rounded-full border-2 border-indigo-400 flex justify-center">
            <div className="absolute top-2 w-1 h-2 bg-indigo-400 rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(var(--orbit-angle)) translateX(var(--orbit-distance));
          }
          to {
            transform: rotate(calc(var(--orbit-angle) + 360deg)) translateX(var(--orbit-distance));
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes spin-clockwise {
          from {
            transform: rotateX(60deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(60deg) rotateZ(360deg);
          }
        }
        
        @keyframes spin-counter-clockwise {
          from {
            transform: rotateX(70deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(70deg) rotateZ(-360deg);
          }
        }
        
        @keyframes scroll-down {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
          }
          60% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }
        
        .perspective-container {
          perspective: 1000px;
        }
        
        .animate-scroll-down {
          animation: scroll-down 2s ease infinite;
        }
      `}</style>
    </section>
  );
}