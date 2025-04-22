"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useScrolling } from "@/hooks/useScrolling";
import { Code, Github, Linkedin, Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { darkMode, toggleDarkMode, accentColor, borderColor } = useTheme();
  const { activeSection, isScrolled, scrollToSection } = useScrolling();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "technologies", label: "Tech" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `py-3 ${
              darkMode
                ? "bg-gray-900/90 backdrop-blur-lg shadow-lg"
                : "bg-white/90 backdrop-blur-lg shadow-lg"
            }`
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div
          className={`text-xl font-bold flex items-center ${
            isScrolled || activeSection !== "hero" ? "opacity-100" : "opacity-0"
          } transition-opacity`}
        >
          <Code className={`mr-2 ${accentColor}`} />
          <span>HoaTran.dev</span>
        </div>

        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative overflow-hidden group`}
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

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group`}
            aria-label="Toggle dark mode"
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </button>

          <Link
            href="#"
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <Github size={20} />
            </div>
          </Link>

          <Link
            href="#"
            className={`p-2 rounded-full ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } transition-colors relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-indigo-500/10 scale-0 rounded-full group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <Linkedin size={20} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
