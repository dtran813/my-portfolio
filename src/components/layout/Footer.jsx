"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Code, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { darkMode, borderColor, accentColor } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-8 border-t ${borderColor} mt-8`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Code className={`mr-2 ${accentColor}`} />
            <span className="font-bold text-lg">HoaTran.dev</span>
          </div>

          <div className="flex space-x-6 items-center">
            <Link
              href="#"
              className={`${
                darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
              } transition-colors transform hover:scale-110`}
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>

            <Link
              href="#"
              className={`${
                darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
              } transition-colors transform hover:scale-110`}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>

            <Link
              href="#"
              className={`${
                darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
              } transition-colors transform hover:scale-110`}
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t ${borderColor} text-center ${
            darkMode ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <p>© {currentYear} HoaTran. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with love 💖 and coffee ☕.</p>
        </div>
      </div>
    </footer>
  );
}
