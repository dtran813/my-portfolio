"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { TECH_CATEGORIES } from "@/utils/constants";
import { Mail } from "lucide-react";

export default function TechnologiesSection() {
  const { darkMode, borderColor, cardBg, accentColor } = useTheme();

  return (
    <section id="technologies" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className={`inline-block ${accentColor} font-mono text-sm mb-4`}>
              # TOOLS & TECHNOLOGIES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
          </div>
          <p
            className={`mt-4 md:mt-0 max-w-md ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tools and technologies I use to bring ideas to life in my software
            development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TECH_CATEGORIES.map((category) => (
            <TechnologyCard
              key={category.title}
              category={category}
              darkMode={darkMode}
              borderColor={borderColor}
              cardBg={cardBg}
            />
          ))}
        </div>

        <div
          className={`mt-16 p-8 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 transform transition-all duration-700 hover:shadow-xl hover:shadow-indigo-500/5`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Let's Build Something Amazing Together
              </h3>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Have a project in mind? I'm currently available for freelance
                work.
              </p>
            </div>
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg flex items-center transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20">
              <Mail className="mr-2" size={20} />
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologyCard({ category, darkMode, borderColor, cardBg }) {
  return (
    <div>
      <div
        className={`${cardBg} rounded-lg border ${borderColor} overflow-hidden shadow-md h-full transform transition-all duration-500 hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30`}
      >
        <div className={`p-6 relative overflow-hidden group h-full`}>
          {/* Semi-transparent circle in the corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative h-full flex flex-col">
            <div className="flex items-center mb-3">
              <span
                className="text-3xl mr-3 animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                {category.icon}
              </span>
              <h3 className="text-xl font-bold flex items-center">
                <span
                  className={`${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  {category.title}
                </span>
              </h3>
            </div>

            <p
              className={`mb-5 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {category.description}
            </p>

            {/* mt-auto pushes this to the bottom when card heights differ */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {category.items.map((tech) => (
                <div
                  key={tech}
                  className={`px-3 py-2 rounded ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  } transition-all duration-300 flex items-center gap-2 group/item transform hover:scale-105 hover:shadow-md`}
                >
                  {/* Small colored dot */}
                  <div
                    className={`h-2 w-2 rounded-full bg-indigo-500 group-hover/item:scale-125 transition-transform`}
                  ></div>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
