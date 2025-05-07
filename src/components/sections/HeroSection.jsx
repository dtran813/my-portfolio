import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrolling } from "@/hooks/useScrolling";
import { Mail, Download, Github, Linkedin } from "lucide-react";
import { SITE_CONFIG } from "@/utils/constants";

export default function EnhancedHeroSection() {
  const { darkMode, accentColor, borderColor } = useTheme();
  const { scrollToSection } = useScrolling();

  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (heroRef.current) {
        setDimensions({
          width: heroRef.current.offsetWidth,
          height: heroRef.current.offsetHeight,
        });
      }
    };

    // Initial dimensions
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Initialize canvas and particles
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize particles
    const particleCount = Math.floor(
      (dimensions.width * dimensions.height) / 10000
    );
    particlesRef.current = Array.from({ length: particleCount }).map(() =>
      createParticle(dimensions.width, dimensions.height)
    );

    startAnimation(ctx);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  // Create a particle with random properties
  const createParticle = (width, height) => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: darkMode
        ? `rgba(${Math.floor(Math.random() * 50) + 100}, ${
            Math.floor(Math.random() * 50) + 100
          }, ${Math.floor(Math.random() * 100) + 155}, ${
            Math.random() * 0.4 + 0.1
          })`
        : `rgba(${Math.floor(Math.random() * 50) + 50}, ${
            Math.floor(Math.random() * 30) + 30
          }, ${Math.floor(Math.random() * 100) + 155}, ${
            Math.random() * 0.3 + 0.1
          })`,
      originalSize: Math.random() * 3 + 1,
    };
  };

  const startAnimation = (ctx) => {
    const animate = () => {
      if (!canvasRef.current) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw background particles
      particlesRef.current.forEach((particle) => {
        drawParticle(ctx, particle);
        updateParticle(particle, dimensions.width, dimensions.height);
      });

      drawConnections(ctx);

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const drawParticle = (ctx, particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  };
  const updateParticle = (particle, width, height) => {
    // Basic motion
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around screen edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
  };

  // Draw connections between nearby particles
  const drawConnections = (ctx) => {
    const maxDistance = dimensions.width > 768 ? 100 : 70;

    // Get all particles
    const allParticles = [...particlesRef.current];

    // Limit connections for performance
    const connectionLimit = 3;

    for (let i = 0; i < allParticles.length; i++) {
      let connections = 0;
      const particleA = allParticles[i];

      for (let j = i + 1; j < allParticles.length; j++) {
        if (connections >= connectionLimit) break;

        const particleB = allParticles[j];
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);

          ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.3;

          ctx.stroke();
          connections++;
        }
      }
    }
  };

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
      transition: "transform 0.1s ease-out",
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
      transition: "transform 0.2s ease-out",
    };
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center pt-16 pb-16 overflow-hidden relative ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Canvas for particles background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Animated gradient spheres */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,1) 0%, rgba(79,70,229,0) 70%)",
          top: "10%",
          right: "10%",
          ...parallaxStyle(-15),
        }}
      />

      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,1) 0%, rgba(99,102,241,0) 70%)",
          bottom: "5%",
          left: "10%",
          ...parallaxStyle(-10),
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,1) 0%, rgba(129,140,248,0) 70%)",
          top: "30%",
          left: "5%",
          ...parallaxStyle(-20),
        }}
      />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 z-10 w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          {/* Left side */}
          <div className="space-y-8">
            {/* Status indicator */}
            <div
              className={`inline-block px-4 py-2 rounded-full ${
                darkMode ? "bg-indigo-500/10" : "bg-indigo-100"
              } font-medium text-sm ${accentColor} mb-2 md:mb-4`}
              style={{
                boxShadow: darkMode
                  ? "0 0 20px rgba(99, 102, 241, 0.3)"
                  : "none",
                animation: "pulse 2s infinite",
              }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-ping" />
              <span>Online & Coding</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4" style={get3DRotationStyle()}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <div className="overflow-hidden">
                  <span
                    className="block transform transition-transform duration-1000"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded
                        ? "translateY(0)"
                        : "translateY(100%)",
                      transitionDelay: "0.2s",
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
                      transform: isLoaded
                        ? "translateY(0)"
                        : "translateY(100%)",
                      transitionDelay: "0.4s",
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
                      transform: isLoaded
                        ? "translateY(0)"
                        : "translateY(100%)",
                      transitionDelay: "0.6s",
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
                      transform: isLoaded
                        ? "translateY(0)"
                        : "translateY(100%)",
                      transitionDelay: "0.8s",
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
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
                transitionDelay: "1s",
              }}
            >
              A software engineer with a creative edge, crafting elegant
              solutions and immersive interfaces. I transform concepts into
              impactful digital realities.
            </p>

            {/* Action buttons */}
            <div
              className="flex flex-wrap gap-4 mt-8"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
                transitionDelay: "1.2s",
              }}
            >
              <button
                className={`relative group overflow-hidden px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg flex items-center transform hover:scale-105`}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 ease-out group-hover:w-full" />
                <span className="relative z-10 flex items-center">
                  <Mail className="mr-2" size={18} />
                  Start a Project
                </span>
              </button>

              <button
                className={`relative group overflow-hidden px-6 py-3 rounded-lg font-medium border ${borderColor} hover:border-indigo-500 transition-colors flex items-center transform hover:scale-105`}
              >
                <span className="absolute inset-0 w-0 bg-indigo-500/10 transition-all duration-300 ease-out group-hover:w-full" />
                <span className="relative z-10 flex items-center">
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
                transition: "opacity 1s ease-out",
                transitionDelay: "1.4s",
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
                <span className="relative overflow-hidden pe-8">
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
                <span className="relative overflow-hidden pe-8">
                  <span className="group-hover:translate-y-full transition-transform inline-block">
                    LinkedIn
                  </span>
                  <span className="absolute top-0 left-0 -translate-y-full group-hover:translate-y-0 transition-transform inline-block text-indigo-400">
                    Hoa Tran
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="relative">
            {/* 3D Animated shape */}
            <div
              className="perspective-container relative aspect-square w-full max-w-md mx-auto"
              style={get3DRotationStyle()}
            >
              {/* Sphere with rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer circle */}
                <div
                  className={`absolute w-full h-full rounded-full ${
                    darkMode ? "bg-indigo-600/5" : "bg-indigo-100/40"
                  } animate-pulse-slow`}
                  style={{
                    ...parallaxStyle(-5),
                    animationDuration: "4s",
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
                      borderWidth: "1px",
                      transform: `rotateX(${60 + i * 10}deg) rotateY(${
                        i * 45
                      }deg)`,
                      animation: `spin-${
                        i % 2 === 0 ? "clockwise" : "counter-clockwise"
                      } ${20 + i * 5}s linear infinite`,
                    }}
                  />
                ))}

                {/* Central sphere */}
                <div
                  className={`relative w-1/2 h-1/2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl flex items-center justify-center`}
                  style={{
                    ...parallaxStyle(-2),
                    boxShadow: darkMode
                      ? "0 0 40px rgba(99,102,241,0.3), inset 0 0 20px rgba(255,255,255,0.1)"
                      : "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04), inset 0 0 20px rgba(255,255,255,0.5)",
                  }}
                >
                  {/* Inner highlight */}
                  <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 rounded-full bg-white opacity-50 blur-sm" />
                </div>
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
                  animation: "float 6s ease-in-out infinite",
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
                  animation: "float 8s ease-in-out infinite",
                  animationDelay: "1s",
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
                  animation: "float 7s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              />

              {/* Code snippets floating */}
              <div
                className={`absolute font-mono text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                } p-2 border ${borderColor} rounded-lg`}
                style={{
                  top: "35%",
                  right: "-5%",
                  ...parallaxStyle(-10),
                  animation: "float 10s ease-in-out infinite",
                  backdropFilter: "blur(8px)",
                  background: darkMode
                    ? "rgba(30,30,30,0.5)"
                    : "rgba(255,255,255,0.5)",
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
                  animation: "float 9s ease-in-out infinite",
                  animationDelay: "1.5s",
                  backdropFilter: "blur(8px)",
                  background: darkMode
                    ? "rgba(30,30,30,0.5)"
                    : "rgba(255,255,255,0.5)",
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
            transition: "opacity 1s ease-out",
            transitionDelay: "1.6s",
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
    </section>
  );
}
