"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { Mail, Download, Github, Linkedin, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useScrolling } from "@/hooks/useScrolling";

export default function HeroSection() {
  const { darkMode, cardBg, borderColor, accentColor } = useTheme();
  const { scrollToSection } = useScrolling();
  const heroRef = useRef(null);
  const { getParallaxStyle } = useMousePosition();

  const titleStrings = [
    "I build digital experiences",
    "I craft elegant interfaces",
    "I solve complex problems",
    "I transform ideas into code",
  ];

  const { displayText } = useTypingEffect(titleStrings, {
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseBeforeDelete: 1500,
    pauseBeforeNext: 2000,
  });

  const [terminalText, setTerminalText] = useState("");
  const terminalLines = [
    "$ whoami",
    "software engineer with a passion for creating impactful digital solutions",
    "$ skills --list",
    "javascript, react, node, typescript, ui/ux, aws...",
    "$ interests",
    "web3, ai, design systems, open source, photography",
    "$ ./launch-portfolio.sh",
    "Initializing portfolio experience...",
    "Ready!",
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeout;

    const typeNextChar = () => {
      if (currentLineIndex >= terminalLines.length) {
        return;
      }

      const currentLine = terminalLines[currentLineIndex];

      if (currentCharIndex <= currentLine.length) {
        setTerminalText((prev) => {
          // Complete the previous lines
          const previousLines = terminalLines
            .slice(0, currentLineIndex)
            .join("\n");
          // Current line being typed
          const currentTyping = currentLine.substring(0, currentCharIndex);

          return previousLines
            ? `${previousLines}\n${currentTyping}`
            : currentTyping;
        });

        currentCharIndex++;
        const isCommand = currentLine.startsWith("$");
        timeout = setTimeout(typeNextChar, isCommand ? 30 : 15);
      } else {
        // Line completed
        currentLineIndex++;
        currentCharIndex = 0;

        // Pause between lines
        const pauseTime = terminalLines[currentLineIndex - 1].startsWith("$")
          ? 500
          : 200;
        timeout = setTimeout(typeNextChar, pauseTime);
      }
    };

    timeout = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center pt-20 overflow-hidden relative"
    >
      {/* Interactive Background Elements - Code Matrix Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="code-rain" />
        </div>

        {/* Animated gradient blobs */}
        <div
          className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
          style={{
            top: "15%",
            right: "5%",
            ...getParallaxStyle(heroRef, -20),
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          style={{
            bottom: "10%",
            left: "5%",
            ...getParallaxStyle(heroRef, -20),
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-10 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Terminal Interface */}
          <div className="relative transform transition-all duration-500 order-2 lg:order-1">
            <div
              className={`relative ${cardBg} rounded-lg overflow-hidden border ${borderColor} shadow-xl transform transition-transform duration-500 hover:scale-[1.02] terminal-window`}
              style={{ minHeight: "380px" }}
            >
              {/* Terminal Header */}
              <div
                className={`flex items-center px-4 py-2 bg-gray-800 border-b ${borderColor}`}
              >
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="mx-auto font-mono text-xs text-gray-400">
                  terminal@portfolio ~{" "}
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm h-full">
                <div className="whitespace-pre-line leading-relaxed terminal-text">
                  {terminalText}
                  <span className="inline-block w-2 h-4 bg-indigo-500 animate-blink ml-1" />
                </div>
              </div>

              {/* Terminal Input Line for interaction */}
              <div
                className={`absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800/50 border-t ${borderColor} flex items-center`}
              >
                <span className={`${accentColor} mr-2`}>$</span>
                <div className="typing-indicator">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>

            {/* Animated Tech Badges */}
            <div className="absolute -bottom-6 -right-6 transform rotate-12">
              <div
                className={`px-3 py-1 rounded-lg ${
                  darkMode ? "bg-blue-900/30" : "bg-blue-100"
                } text-blue-500 text-xs font-mono border border-blue-500/30 animate-float`}
                style={{ animationDelay: "0.5s" }}
              >
                React
              </div>
            </div>
            <div className="absolute -top-4 -left-4 transform -rotate-6">
              <div
                className={`px-3 py-1 rounded-lg ${
                  darkMode ? "bg-green-900/30" : "bg-green-100"
                } text-green-500 text-xs font-mono border border-green-500/30 animate-float`}
                style={{ animationDelay: "0.2s" }}
              >
                Node.js
              </div>
            </div>
            <div className="absolute top-1/2 -right-10 transform rotate-90">
              <div
                className={`px-3 py-1 rounded-lg ${
                  darkMode ? "bg-purple-900/30" : "bg-purple-100"
                } text-purple-500 text-xs font-mono border border-purple-500/30 animate-float`}
                style={{ animationDelay: "0.8s" }}
              >
                TypeScript
              </div>
            </div>
          </div>

          {/* Right Side: Creative Headline */}
          <div className="space-y-6 order-1 lg:order-2">
            <div
              className={`inline-block px-4 py-2 rounded-full ${
                darkMode ? "bg-indigo-500/10" : "bg-indigo-100"
              } font-medium text-sm ${accentColor} mb-0 animate-pulse`}
              style={{ animationDuration: "2s" }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500 mr-2" />
              <span className="typing-status">Online & Coding</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">Hello, I'm</span>
                <span className={`block mt-2 ${accentColor}`}>
                  <span className="relative">
                    <span>Hoa Tran</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-500/20 -z-10 rounded-full" />
                  </span>
                </span>
              </h1>
              <div className="mt-5">
                <p className="cursor-typing overflow-hidden">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {displayText}
                  </span>
                  <span className="inline-block w-[3px] h-8 bg-indigo-500 animate-blink ml-1" />
                </p>
              </div>
            </div>

            <div className="space-y-6 max-w-2xl">
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                A software engineer with a creative edge, blending technical
                expertise with a passion for design. I build experiences that
                leave a lasting impression.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
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

            <div className="flex items-center space-x-6 pt-4">
              <Link
                href="https://github.com/dtran813"
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
              </Link>
              <Link
                href="#"
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
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => scrollToSection("about")}
        >
          <div
            className={`text-sm ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Discover My Story
          </div>
          <ArrowDown
            className="animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>
    </section>
  );
}
