"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { EXPERIENCES } from "@/utils/constants";
import { Download } from "lucide-react";

export default function ExperienceSection() {
  const { darkMode, borderColor, cardBg, accentColor } = useTheme();

  return (
    <section id="experience" className="py-20 relative">
      {/*  Gradient background */}
      <div className="absolute left-0 top-1/3 transform -translate-y-1/2 w-1/4 h-1/2 bg-indigo-500/5 rounded-r-3xl blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className={`inline-block ${accentColor} font-mono text-sm mb-4`}>
              # PROFESSIONAL JOURNEY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
          </div>
          <p
            className={`mt-4 md:mt-0 max-w-md ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            My professional journey and key roles that have shaped my career and
            expertise.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div
            className={`absolute top-12 bottom-20 left-6 md:left-1/2 w-0.5 bg-gradient-to-b ${
              darkMode
                ? "from-indigo-500 via-indigo-500/50 to-transparent"
                : "from-indigo-600 via-indigo-600/50 to-transparent"
            }`}
          ></div>

          {EXPERIENCES.map((job, i) => (
            <div key={job.year} className="relative mb-20 last:mb-0">
              <div className="grid grid-cols-12 gap-8 items-start">
                <div
                  className={`absolute top-0 left-6 md:left-1/2 w-5 h-5 rounded-full border-4 transform -translate-x-1/2 z-10 ${
                    job.isCurrent
                      ? `bg-indigo-500 border-indigo-300 animate-pulse`
                      : "bg-gray-700 border-gray-600"
                  }`}
                  style={{ animationDuration: "2s" }}
                ></div>

                {/* Left side (desktop only), hidden on mobile */}
                <div className="hidden md:block md:col-span-5 md:text-right pr-16">
                  <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                  <p className={`${accentColor} font-medium`}>{job.company}</p>
                  <div
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } mt-2 flex items-center justify-end`}
                  >
                    <p>{job.location}</p>
                    <span className="mx-2">•</span>
                    <p>{job.year}</p>
                  </div>
                </div>

                {/* Right side */}
                <div className="col-span-12 md:col-span-7 md:pl-16 pl-16">
                  {/* Mobile only title - appears above the card on small screens */}
                  <div className="md:hidden mb-3">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className={`${accentColor} font-medium`}>
                      {job.company}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } text-sm`}
                    >
                      {job.location} • {job.year}
                    </p>
                  </div>

                  <div
                    className={`${cardBg} rounded-lg p-6 border ${
                      job.isCurrent ? "border-indigo-500/30" : borderColor
                    } shadow-lg relative group overflow-hidden transform transition-all duration-500 hover:scale-[1.03]`}
                  >
                    {/* Accent border that grows on hover */}
                    <div
                      className={`absolute top-0 left-0 w-1.5 h-full ${
                        job.isCurrent ? "bg-indigo-500" : "bg-gray-600"
                      } group-hover:bg-indigo-500 transition-colors`}
                    ></div>

                    {/* Content with bullet points */}
                    <div className="pl-4">
                      <ul className="space-y-3">
                        {job.points.map((point, idx) => (
                          <li key={idx} className="flex items-start group/item">
                            {/* Each bullet point has its own hover effect */}
                            <div
                              className={`h-2 w-2 rounded-full ${
                                job.isCurrent ? "bg-indigo-500" : "bg-gray-500"
                              } mt-2 mr-3 flex-shrink-0 group-hover/item:bg-indigo-500 transition-colors`}
                            ></div>
                            <p>{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-16">
            <button
              className={`flex items-center px-6 py-3 rounded-lg font-medium border ${borderColor} hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all`}
            >
              <Download className="mr-2" size={18} />
              Download Full Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
