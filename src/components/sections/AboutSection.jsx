import { useTheme } from "@/contexts/ThemeContext";
import { Download, Mail, Sparkles, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const { darkMode, borderColor, cardBg, accentColor } = useTheme();

  return (
    <section id="about" className="py-28 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract grid for depth */}
        <div className="absolute h-full w-full grid grid-cols-12 opacity-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`grid-col-${i}`}
              className={`h-full border-r ${borderColor}`}
            ></div>
          ))}
        </div>

        {/* Blob decoration */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className={`inline-block ${accentColor} font-mono text-sm mb-4`}>
            # MY JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            The Story Behind The Code
            <div className="absolute -right-10 -top-10">
              <Sparkles
                className={`${accentColor} animate-pulse`}
                style={{ animationDuration: "3s" }}
              />
            </div>
          </h2>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } max-w-3xl mx-auto`}
          >
            A creative technologist with a background in design and engineering,
            blending aesthetics with functionality to craft meaningful digital
            experiences.
          </p>
        </div>

        {/* Interactive Story Cards */}
        <div className="relative mb-20">
          {/* Vertical Timeline Line */}
          <div
            className={`absolute h-full w-1 left-1/2 transform -translate-x-1/2 ${
              darkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>

          {/* Animated Gradient Progress Indicator */}
          <div
            className={`absolute h-full w-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse-slow timeline-progress`}
            style={{ animationDuration: "3s" }}
          ></div>

          {/* Chapter Cards */}
          {[
            {
              title: "The Beginning",
              year: "2019",
              content:
                "My journey began with a fascination for how things work. I built my first website out of curiosity, which quickly evolved into a passion for creating digital experiences.",
              icon: "💡",
              color: "indigo",
              side: "left",
              image: false,
            },
            {
              title: "Finding My Path",
              year: "2020-2021",
              content:
                "Diving deeper into development, I discovered the perfect intersection of logic and creativity. I embraced the challenge of solving complex problems while maintaining beautiful interfaces.",
              icon: "🧭",
              color: "blue",
              side: "right",
              image: false,
            },
            {
              title: "Growth & Learning",
              year: "2022-2023",
              content:
                "Expanding my skills across the full stack, I began contributing to open source and building products that made a difference. Each project taught valuable lessons about scalability and user experience.",
              icon: "🌱",
              color: "green",
              side: "left",
              image: false,
            },
            {
              title: "Where I Am Today",
              year: "2024-Present",
              content:
                "Now focused on creating impactful digital solutions, I combine technical expertise with a keen eye for design. I'm passionate about crafting experiences that are both functional and delightful.",
              icon: "✨",
              color: "purple",
              side: "right",
              image: false,
            },
          ].map((chapter, idx) => (
            <div key={chapter.title} className="relative mb-20 last:mb-0">
              {/* Timeline Node */}
              <div
                className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-${
                  chapter.color
                }-500/20 border-4 ${
                  darkMode ? `border-gray-800` : `border-white`
                } flex items-center justify-center text-xl z-10 timeline-node`}
              >
                <span
                  className="animate-bounce"
                  style={{
                    animationDuration: "2s",
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  {chapter.icon}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {chapter.side === "right" && (
                  <div className="hidden md:block"></div>
                )}

                <div
                  className={`${cardBg} p-6 rounded-xl border ${borderColor} shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl timeline-card group`}
                >
                  <div className={`text-sm font-semibold ${accentColor} mb-2`}>
                    {chapter.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                    {chapter.title}
                  </h3>

                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } mb-4`}
                  >
                    {chapter.content}
                  </p>

                  <div
                    className={`w-full h-1 bg-${chapter.color}-500/30 rounded-full overflow-hidden mt-4`}
                  >
                    <div
                      className={`h-full bg-${chapter.color}-500 animate-grow-x`}
                      style={{ animationDelay: `${idx * 0.5}s` }}
                    ></div>
                  </div>
                </div>

                {chapter.side === "left" && (
                  <div className="hidden md:block"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy & Approach */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <h3 className="text-2xl font-bold mb-6 inline-flex items-center">
                <Terminal className={`${accentColor} mr-2`} size={24} />
                My Approach to Problem Solving
              </h3>

              <div
                className={`${cardBg} rounded-lg p-6 border ${borderColor} shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group`}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>

                <div className="pl-4 space-y-4">
                  <p>
                    I believe great software emerges from the perfect balance
                    between functionality, user experience, and clean code. My
                    approach combines technical precision with creative problem
                    solving.
                  </p>

                  <p>
                    When tackling complex challenges, I break them down into
                    manageable components, prototype rapidly, and iterate based
                    on feedback. This allows for flexibility while maintaining a
                    clear vision of the end goal.
                  </p>

                  <div className="pt-4 border-t border-gray-700/30">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                        <span className="text-sm">01</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-400">
                          Understand the problem deeply
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                      <span className="text-sm">02</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-400">
                        Research and explore potential solutions
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                      <span className="text-sm">03</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-400">
                        Build, test, and iterate quickly
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                      <span className="text-sm">04</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-400">
                        Deploy, monitor, and improve continuously
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <h3 className="text-2xl font-bold mb-6 inline-flex items-center">
                <Sparkles className={`${accentColor} mr-2`} size={24} />
                Fun Facts
              </h3>

              <div className="space-y-4">
                {[
                  {
                    fact: "Fact 1: I love to travel and explore new cultures",
                    icon: "🧒",
                  },
                  {
                    fact: "Fact 2: I have a passion for photography and capturing moments",
                    icon: "🌐",
                  },
                  {
                    fact: "Fact 3: My favorite hobby is listening to music",
                    icon: "📷",
                  },
                  {
                    fact: "Fact 4: I enjoy solving puzzles and brain teasers",
                    icon: "🧩",
                  },
                  {
                    fact: "Fact 5: Workout at least 3 times a week",
                    icon: "☕",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${cardBg} rounded-lg p-4 border ${borderColor} flex items-center transform transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-indigo-500/30 group`}
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl mr-3 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.fact}
                    </p>
                  </div>
                ))}
              </div>

              {/* Inspirational quote */}
              <div
                className={`mt-4 p-5 rounded-lg ${
                  darkMode ? "bg-gray-800/50" : "bg-gray-100"
                } border ${borderColor} transform transition-all duration-300 hover:scale-[1.03]`}
              >
                <div className="flex items-start">
                  <svg
                    className="w-8 h-8 mr-3 text-indigo-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <div>
                    <p className="italic font-medium mb-2">
                      "The best way to predict the future is to create it."
                    </p>
                    <p className="text-sm text-right text-gray-500">
                      — Abraham Lincoln
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <div
            className={`inline-block px-6 py-8 rounded-xl bg-gradient-to-r ${
              darkMode
                ? "from-indigo-900/40 to-purple-900/40"
                : "from-indigo-50 to-purple-50"
            } border border-indigo-500/20 transform transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group max-w-3xl`}
          >
            <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-400 transition-colors">
              Ready to Start a Project Together?
            </h3>
            <p className="mb-6">
              I'm currently available for freelance work and exciting
              collaborations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg flex items-center transform group-hover:scale-105">
                <Mail className="mr-2" size={18} />
                Get in Touch
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium border ${borderColor} hover:border-indigo-500 transition-colors flex items-center transform group-hover:scale-105`}
              >
                <Download className="mr-2" size={18} />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsCategories({ darkMode }) {
  const skillCategories = [
    {
      title: "Professional",
      skills: [
        "Web Development",
        "UI/UX Design",
        "Cloud Solutions",
        "System Architecture",
        "API Design",
      ],
    },
    {
      title: "Personal",
      skills: ["Open Source", "Photography", "Travel", "Music", "Reading"],
    },
  ];

  return (
    <div className="space-y-4">
      {skillCategories.map((category) => (
        <div key={category.title}>
          <h4 className="font-medium mb-2">{category.title}</h4>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-gray-700 hover:bg-indigo-500"
                    : "bg-gray-200 hover:bg-indigo-100"
                } transition-colors hover:text-indigo-600 cursor-default`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
