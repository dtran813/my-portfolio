"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useScrolling } from "@/hooks/useScrolling";
import { NAV_ITEMS, SITE_CONFIG } from "@/utils/constants";
import { Code, Github, Linkedin, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { darkMode, toggleDarkMode, bgColor, accentColor, borderColor } =
    useTheme();
  const { activeSection, isScrolled, scrollToSection } = useScrolling();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? `py-3 ${
              darkMode
                ? "bg-gray-900/90 backdrop-blur-lg shadow-lg"
                : "bg-white/90 backdrop-blur-lg shadow-lg"
            }`
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className={`text-xl font-bold flex items-center ${
            isScrolled || activeSection !== "hero" || mobileMenuOpen
              ? "opacity-100"
              : "opacity-0"
          } transition-opacity`}
        >
          <Code className={`mr-2 ${accentColor}`} />
          <span>{SITE_CONFIG.domain}</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative overflow-hidden group cursor-pointer`}
            >
              <span
                className={`${activeSection === item.id ? accentColor : ""}`}
              >
                {item.label}
              </span>
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 ${
                  activeSection === item.id ? "bg-indigo-500" : "bg-gray-600"
                } transform origin-left transition-transform duration-300 ${
                  activeSection === item.id ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100`}
              ></span>
            </button>
          ))}
        </div>

        {/* Desktop action icons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group cursor-pointer`}
            aria-label="Toggle dark mode"
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </button>

          <a
            href={SITE_CONFIG.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <Github size={20} />
            </div>
          </a>

          <a
            href={SITE_CONFIG.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <Linkedin size={20} />
            </div>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className={`px-6 py-2`}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-3 ${
                  activeSection === item.id ? accentColor : ""
                }`}
              >
                {item.label}
              </button>
            ))}

            <div
              className={`flex items-center justify-between mt-4 pt-4 border-t ${borderColor}`}
            >
              <button onClick={toggleDarkMode} className="flex items-center">
                {darkMode ? (
                  <>
                    <Sun size={16} className="mr-2" />
                    <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} className="mr-2" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-4">
                <a
                  href={SITE_CONFIG.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href={SITE_CONFIG.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
