import { useState, useEffect, useRef } from "react";
import { Mail, Download, Github, Linkedin, ArrowRight } from "lucide-react";

export default function CreativeHeroSection() {
  // Temporary theme values
  const darkMode = true;
  const textColor = darkMode ? "text-gray-100" : "text-gray-900";
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [interactionPoint, setInteractionPoint] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("developer");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mouseLeft, setMouseLeft] = useState(false);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const textParticlesRef = useRef([]);
  const [textToReveal, setTextToReveal] = useState("");
  
  // Simple scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    // Initial dimensions
    handleResize();
    
    // Set up listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize canvas and particles
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Initialize particles
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 12000); // Adjust density
    particlesRef.current = Array.from({ length: particleCount }).map(() => createParticle(dimensions.width, dimensions.height));
    
    // Initialize text particles (initially empty)
    textParticlesRef.current = [];
    
    // Start animation
    startAnimation(ctx);
    
    // After a delay, show the content
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
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
        ? `rgba(${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.4 + 0.1})`
        : `rgba(${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 30) + 30}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.3 + 0.1})`,
      originalSize: Math.random() * 3 + 1,
      isText: false
    };
  };
  
  // Create text particles from text
  const createTextParticles = (text) => {
    if (!canvasRef.current) return [];
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set up font
    const fontSize = Math.min(dimensions.width / 15, 80);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create temporary canvas for text
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = dimensions.width;
    tempCanvas.height = dimensions.height;
    
    // Draw text on temp canvas
    tempCtx.font = ctx.font;
    tempCtx.fillStyle = ctx.fillStyle;
    tempCtx.textAlign = ctx.textAlign;
    tempCtx.textBaseline = ctx.textBaseline;
    tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
    
    // Sample pixels
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;
    
    const particles = [];
    const sampleFactor = Math.max(1, Math.floor(dimensions.width / 300)); // Adjust resolution based on screen size
    
    for (let y = 0; y < tempCanvas.height; y += sampleFactor) {
      for (let x = 0; x < tempCanvas.width; x += sampleFactor) {
        const index = (y * tempCanvas.width + x) * 4;
        if (data[index + 3] > 128) { // If pixel is visible (alpha > 128)
          const particle = {
            x: Math.random() * tempCanvas.width,
            y: Math.random() * tempCanvas.height,
            targetX: x,
            targetY: y,
            size: Math.random() * 2 + 2,
            speedX: 0,
            speedY: 0,
            color: `rgba(${Math.floor(Math.random() * 30) + 120}, ${Math.floor(Math.random() * 40) + 110}, ${Math.floor(Math.random() * 80) + 175}, ${Math.random() * 0.8 + 0.2})`,
            originalSize: Math.random() * 2 + 2,
            isText: true
          };
          particles.push(particle);
        }
      }
    }
    
    return particles;
  };
  
  // Handle mouse/touch interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      setInteractionPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsHovering(true);
      setMouseLeft(false);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMouseLeft(true);
    };
    
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        setInteractionPoint({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        });
        setIsHovering(true);
        setMouseLeft(false);
      }
    };
    
    const handleTouchEnd = () => {
      setMouseLeft(true);
      // Don't set isHovering to false immediately for touch to let the effect linger
      setTimeout(() => {
        setIsHovering(false);
      }, 1000);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);
  
  // Handle tab changes for text particles
  useEffect(() => {
    let textToShow = "";
    switch(activeTab) {
      case "developer":
        textToShow = "DEVELOPER";
        break;
      case "designer":
        textToShow = "DESIGNER";
        break;
      case "creator":
        textToShow = "CREATOR";
        break;
      default:
        textToShow = "DEVELOPER";
    }
    
    setTextToReveal(textToShow);
  }, [activeTab]);
  
  // Update text particles when text changes
  useEffect(() => {
    if (textToReveal) {
      textParticlesRef.current = createTextParticles(textToReveal);
    }
  }, [textToReveal, dimensions]);
  
  // Animation loop
  const startAnimation = (ctx) => {
    const animate = () => {
      if (!canvasRef.current) return;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw background particles
      particlesRef.current.forEach(particle => {
        drawParticle(ctx, particle);
        updateParticle(particle, dimensions.width, dimensions.height);
      });
      
      // Draw text particles
      textParticlesRef.current.forEach(particle => {
        drawParticle(ctx, particle);
        updateTextParticle(particle);
      });
      
      // Create connections between particles
      drawConnections(ctx);
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  // Draw a particle
  const drawParticle = (ctx, particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  };
  
  // Update particle position
  const updateParticle = (particle, width, height) => {
    // Basic motion
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Wrap around screen edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
    
    // Interaction with mouse/touch
    if (isHovering && !particle.isText) {
      const dx = particle.x - interactionPoint.x;
      const dy = particle.y - interactionPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 2;
        particle.speedX += dx * force * 0.01;
        particle.speedY += dy * force * 0.01;
        particle.size = particle.originalSize * (1 + force * 0.5);
      } else {
        // Gradually revert to original size
        particle.size += (particle.originalSize - particle.size) * 0.1;
      }
    } else if (mouseLeft && !particle.isText) {
      // Return to original size after mouse leaves
      particle.size += (particle.originalSize - particle.size) * 0.1;
      
      // Slow down gradually
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;
    }
    
    // Apply speed limits
    const maxSpeed = 2;
    particle.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, particle.speedX));
    particle.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, particle.speedY));
  };
  
  // Update text particle behavior
  const updateTextParticle = (particle) => {
    // Move towards target position
    const dx = particle.targetX - particle.x;
    const dy = particle.targetY - particle.y;
    
    particle.x += dx * 0.08;
    particle.y += dy * 0.08;
    
    // Interaction with mouse
    if (isHovering) {
      const mouseDx = particle.x - interactionPoint.x;
      const mouseDy = particle.y - interactionPoint.y;
      const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      const mouseMaxDistance = 100;
      
      if (mouseDistance < mouseMaxDistance) {
        const force = (1 - mouseDistance / mouseMaxDistance) * 2;
        particle.x += mouseDx * force * 0.1;
        particle.y += mouseDy * force * 0.1;
      }
    }
  };
  
  // Draw connections between nearby particles
  const drawConnections = (ctx) => {
    const maxDistance = dimensions.width > 768 ? 100 : 70;
    
    // Get all particles
    const allParticles = [...particlesRef.current, ...textParticlesRef.current];
    
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
          
          if (particleA.isText && particleB.isText) {
            // Connections between text particles
            ctx.strokeStyle = `rgba(120, 120, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 0.8;
          } else if (particleA.isText || particleB.isText) {
            // Connections between text and normal particles
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
          } else {
            // Connections between normal particles
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 0.3;
          }
          
          ctx.stroke();
          connections++;
        }
      }
    }
  };
  
  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      ref={containerRef}
    >
      {/* Canvas for particles and animations */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          {/* Left side: Text content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Badge - animate in */}
            <div
              className="inline-block"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.1s',
              }}
            >
              <div className="px-4 py-2 rounded-full bg-indigo-900/30 text-indigo-400 text-sm font-medium border border-indigo-800/50 flex items-center">
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 animate-pulse mr-2"></span>
                <span>Available for new projects</span>
              </div>
            </div>
            
            {/* Name - animate in */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.3s',
              }}
            >
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="block text-white">I'm Hoa Tran</span>
                <div className="mt-3 flex items-center flex-wrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">I am a </span>
                  {/* Interactive tabs for changing text particles */}
                  <div className="flex ml-4 space-x-2">
                    <button 
                      onClick={() => setActiveTab("developer")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        activeTab === "developer" 
                          ? "bg-indigo-600/80 text-white" 
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      Developer
                    </button>
                    <button 
                      onClick={() => setActiveTab("designer")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        activeTab === "designer" 
                          ? "bg-indigo-600/80 text-white" 
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      Designer
                    </button>
                    <button 
                      onClick={() => setActiveTab("creator")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        activeTab === "creator" 
                          ? "bg-indigo-600/80 text-white" 
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      Creator
                    </button>
                  </div>
                </div>
              </h1>
            </div>
            
            {/* Description - animate in */}
            <div
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.5s',
              }}
            >
              <p className="text-lg text-gray-300 max-w-lg">
                I build digital experiences that combine technical excellence with creative vision. 
                Specializing in interactive web applications that engage users and achieve business goals.
              </p>
            </div>
            
            {/* CTA buttons - animate in */}
            <div
              className="pt-4 flex flex-wrap gap-4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.7s',
              }}
            >
              {/* Primary CTA */}
              <button className="interactive-btn primary">
                <span className="relative z-10 flex items-center">
                  <span>Start a Project</span>
                  <ArrowRight size={18} className="ml-2" />
                </span>
              </button>
              
              {/* Secondary CTA */}
              <button className="interactive-btn secondary">
                <span className="relative z-10 flex items-center">
                  <span>Download CV</span>
                  <Download size={18} className="ml-2" />
                </span>
              </button>
            </div>
            
            {/* Social links */}
            <div
              className="pt-6 flex items-center space-x-6"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: '0.9s',
              }}
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="social-icon-container">
                  <Github className="social-icon" />
                </div>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="social-icon-container">
                  <Linkedin className="social-icon" />
                </div>
              </a>
              <a
                href="mailto:you@example.com"
                className="group"
              >
                <div className="social-icon-container">
                  <Mail className="social-icon" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Right side: Visual content */}
          <div 
            className="lg:col-span-2 relative h-64 lg:h-96"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
              transition: 'opacity 1s ease-out, transform 1s ease-out',
              transitionDelay: '0.2s',
            }}
          >
            {/* 3D image effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="perspective-wrapper w-full h-full relative">
                <div className="profile-card">
                  <div className="profile-card-inner">
                    {/* Replace with your own image */}
                    <div className="profile-image-container">
                      <div className="profile-image-gradient"></div>
                      <div className="profile-image-placeholder">
                        {/* Placeholder for profile image - replace with actual image */}
                        <div className="text-3xl font-bold text-white">HT</div>
                      </div>
                    </div>
                    
                    {/* Tech icons floating */}
                    <div className="tech-icon tech-icon-1">
                      <span>React</span>
                    </div>
                    <div className="tech-icon tech-icon-2">
                      <span>Node</span>
                    </div>
                    <div className="tech-icon tech-icon-3">
                      <span>UX</span>
                    </div>
                    <div className="tech-icon tech-icon-4">
                      <span>TS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mouse hint */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-sm"
          style={{
            opacity: isLoaded ? 0.7 : 0,
            transition: 'opacity 1s ease-out',
            transitionDelay: '1.5s',
          }}
        >
          <p className="mb-2">Move your mouse/finger across the screen</p>
          <svg width="20" height="30" viewBox="0 0 20 30" className="mx-auto opacity-50">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="10" cy="10" r="3" className="animate-scroll-mouse" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        /* Mouse scroll animation */
        @keyframes scrollMouse {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-scroll-mouse {
          animation: scrollMouse 1.5s infinite;
        }
        
        /* 3D profile card effects */
        .perspective-wrapper {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .profile-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }
        
        .profile-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(0);
          transition: transform 0.3s ease-out;
        }
        
        .perspective-wrapper:hover .profile-card-inner {
          transform: translateZ(20px);
        }
        
        .profile-image-container {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(79,70,229,0.2) 0%, rgba(124,58,237,0.2) 100%);
          border: 2px solid rgba(139, 92, 246, 0.2);
          box-shadow: 
            0 20px 40px -20px rgba(79,70,229,0.4),
            0 0 60px -20px rgba(124,58,237,0.4),
            inset 0 0 40px 0 rgba(139,92,246,0.1);
        }
        
        .profile-image-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(124,58,237,0.8) 0%, rgba(79,70,229,0.4) 40%, rgba(0,0,0,0) 60%);
          opacity: 0.5;
        }
        
        .profile-image-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        /* Tech icons */
        .tech-icon {
          position: absolute;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          background: rgba(79,70,229,0.3);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(139,92,246,0.3);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transform-style: preserve-3d;
          z-index: 2;
        }
        
        .tech-icon-1 {
          top: 15%;
          right: -10%;
          animation: float 6s ease-in-out infinite;
        }
        
        .tech-icon-2 {
          bottom: 20%;
          right: 10%;
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .tech-icon-3 {
          bottom: 10%;
          left: 0%;
          animation: float 5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .tech-icon-4 {
          top: 25%;
          left: -5%;
          animation: float 8s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateZ(20px); }
          50% { transform: translateY(-15px) translateZ(30px); }
        }
        
        /* Interactive buttons */
        .interactive-btn {
          position: relative;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          overflow: hidden;
          transition: all 0.3s;
          z-index: 1;
        }
        
        .interactive-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          transition: all 0.5s;
        }
        
        .interactive-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          transition: all 0.5s;
        }
        
        .interactive-btn.primary {
          color: white;
          background-color: transparent;
        }
        
        .interactive-btn.primary::before {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
        
        .interactive-btn.primary::after {
          background: linear-gradient(90deg, #7c3aed, #4f46e5);
          opacity: 0;
        }
        
        .interactive-btn.primary:hover::before {
          opacity: 0;
        }
        
        .interactive-btn.primary:hover::after {
          opacity: 1;
        }
        
        .interactive-btn.secondary {
          color: #a78bfa;
          background-color: transparent;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        
        .interactive-btn.secondary::before {
          background-color: rgba(124, 58, 237, 0.1);
          transform: scaleX(0);
          transform-origin: right;
        }
        
        .interactive-btn.secondary:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        /* Social icons */
        .social-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(79, 70, 229, 0.1);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .social-icon-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(79, 70, 229, 0.7), rgba(124, 58, 237, 0.7));
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .social-icon-container:hover::before {
          opacity: 1;
        }
        
        .social-icon {
          width: 20px;
          height: 20px;
          color: #a78bfa;
          transition: all 0.3s;
          z-index: 1;
          position: relative;
        }
        
        .social-icon-container:hover .social-icon {
          color: white;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}