import { useState, useRef, useEffect } from "react";
import { Mail, Sparkles, Terminal, Award } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CHAPTERS,
  CORE_VALUES,
  DESIGN_SKILLS,
  FUN_FACTS,
  TECHNICAL_SKILLS,
} from "@/utils/constants";

export default function AboutSection() {
  const { darkMode, textColor, borderColor, cardBg, accentColor } = useTheme();

  // For scroll animations
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef([]);

  // Track scroll for animations
  useEffect(() => {
    const determineActiveChapter = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Default to first chapter
      let newActiveChapter = 0;

      chapterRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        const offsetHeight = rect.height;

        // If the middle of the viewport is within this chapter's boundaries
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          newActiveChapter = index;
        }
      });

      // Only update state if the active chapter has changed
      if (newActiveChapter !== activeChapter) {
        setActiveChapter(newActiveChapter);
      }
    };

    window.addEventListener("scroll", determineActiveChapter);

    // Initial determination on component mount
    determineActiveChapter();

    return () => window.removeEventListener("scroll", determineActiveChapter);
  }, [activeChapter]);

  return (
    <section id="about" className="py-20 relative">
      {/* Blob decoration */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`inline-block ${accentColor} font-mono text-sm mb-4`}>
            # MY JOURNEY
          </p>
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

        {/* Journey timeline */}
        <div className="relative mb-20">
          {/* Tabs for timeline navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {CHAPTERS.map((chapter, idx) => (
              <button
                key={`tab-${idx}`}
                onClick={() => {
                  chapterRefs.current[idx]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeChapter === idx
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <span className="mr-2">{chapter.icon}</span>
                <span className="hidden md:inline">{chapter.title}</span>
                <span className="inline md:hidden">{chapter.year}</span>
              </button>
            ))}
          </div>

          {/* Timeline with cards */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className={`absolute h-full w-1 left-1/2 transform -translate-x-1/2 ${
                darkMode ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></div>

            {/* Progress indicator */}
            <div
              className={`absolute h-full w-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-indigo-600 to-transparent animate-pulse-slow`}
              style={{
                animationDuration: "3s",
                height: `${(activeChapter + 1) * 25}%`,
              }}
            ></div>

            {/* Chapter Cards */}
            {CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.title}
                className="relative mb-28 last:mb-0"
                ref={(el) => (chapterRefs.current[idx] = el)}
              >
                {/* Timeline node with pulse animation */}
                <div
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-${
                    chapter.color
                  }-500/20 border-4 ${
                    darkMode ? `border-gray-800` : `border-white`
                  } flex items-center justify-center text-xl z-10 ${
                    activeChapter === idx
                      ? "ring-4 ring-indigo-500/30 animate-pulse-slow"
                      : ""
                  }`}
                >
                  <span
                    className={activeChapter === idx ? "animate-bounce" : ""}
                    style={{
                      animationDuration: "2s",
                    }}
                  >
                    {chapter.icon}
                  </span>
                </div>

                {/* Card layout - Different for even/odd */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {idx % 2 === 1 && <div className="hidden md:block"></div>}

                  <ChapterCard
                    chapter={chapter}
                    idx={idx}
                    activeChapter={activeChapter}
                    cardBg={cardBg}
                    accentColor={accentColor}
                    borderColor={borderColor}
                    darkMode={darkMode}
                  />

                  {idx % 2 === 0 && <div className="hidden md:block"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Values */}
        <div className="mt-24 mb-20">
          <h3 className="text-2xl font-bold mb-10 text-center inline-flex items-center justify-center w-full">
            <span className="h-px bg-gray-700 flex-grow mr-6"></span>
            <span className="flex items-center">
              <Terminal className={`${accentColor} mr-2`} size={24} />
              Skills & Values
            </span>
            <span className="h-px bg-gray-700 flex-grow ml-6"></span>
          </h3>

          {/* Skill cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillCard
              title="Technical Expertise"
              description="Building with modern frameworks and practices, focusing on performance, accessibility and maintainability."
              icon={<Terminal className="h-8 w-8 text-indigo-400" />}
              color="indigo"
              skills={TECHNICAL_SKILLS}
              cardBg={cardBg}
              borderColor={borderColor}
            />

            <SkillCard
              title="Creative Design"
              description="Crafting intuitive interfaces and delightful interactions that engage users and solve real problems."
              icon={<Sparkles className="h-8 w-8 text-blue-400" />}
              color="blue"
              skills={DESIGN_SKILLS}
              cardBg={cardBg}
              borderColor={borderColor}
            />

            <ValuesCard
              values={CORE_VALUES}
              cardBg={cardBg}
              borderColor={borderColor}
            />
          </div>
        </div>

        {/* Personal interests */}
        <div className="mt-20 mb-20">
          <h3 className="text-2xl font-bold mb-10 text-center">
            <span className="relative inline-block">
              Beyond The Code
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {FUN_FACTS.map((fact, i) => (
              <FactCard
                key={i}
                fact={fact}
                textColor={textColor}
                cardBg={cardBg}
                borderColor={borderColor}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <CallToAction darkMode={darkMode} />
        </div>
      </div>
    </section>
  );
}

const ChapterCard = ({
  chapter,
  idx,
  activeChapter,
  cardBg,
  accentColor,
  borderColor,
  darkMode,
}) => (
  <div
    className={`${cardBg} rounded-xl border ${
      activeChapter === idx
        ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10"
        : borderColor
    } overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl group ${
      activeChapter === idx ? "scale-[1.02]" : ""
    }`}
  >
    {/* Card header */}
    <div
      className={`bg-gradient-to-r from-${chapter.color}-500/20 to-transparent p-6`}
    >
      <div className={`text-sm font-semibold ${accentColor} mb-2`}>
        {chapter.year}
      </div>
      <h3 className="text-2xl font-bold mb-1 group-hover:text-indigo-400 transition-colors flex items-center">
        {chapter.title}
        {activeChapter === idx && (
          <Sparkles className="w-4 h-4 ml-2 text-indigo-400" />
        )}
      </h3>
    </div>

    {/* Card content */}
    <div className="p-6 pt-4">
      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
        {chapter.content}
      </p>

      {/* Skills Tags */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Key Skills:</div>
        <div className="flex flex-wrap gap-2">
          {chapter.skills.map((skill) => (
            <span
              key={skill}
              className={`px-3 py-1 text-xs rounded-full bg-${chapter.color}-500/20 text-${chapter.color}-300 border border-${chapter.color}-500/10`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Decoration bar */}
      <div
        className={`w-full h-1 bg-${chapter.color}-500 rounded-full overflow-hidden mt-6`}
      ></div>
    </div>
  </div>
);

const SkillCard = ({
  title,
  description,
  icon,
  color,
  skills,
  cardBg,
  borderColor,
}) => (
  <div
    className={`${cardBg} rounded-lg border ${borderColor} p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}
  >
    <div className="relative h-16 w-16 mb-4">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-${color}-500 to-${
          color === "indigo" ? "purple" : color === "blue" ? "cyan" : "pink"
        }-600 rounded-lg opacity-20 animate-pulse-slow`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {icon}
      </div>
    </div>

    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-gray-400 mb-4">{description}</p>

    <div className="space-y-3">
      {skills.map((item, i) => (
        <div key={i} className="flex items-center">
          <div className={`h-2 w-2 rounded-full bg-${color}-500 mr-3`}></div>
          <div className="text-sm">{item.skill}</div>
          <div className="ml-auto flex">
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className={`h-1.5 w-5 rounded-full ml-1 ${
                  j < item.level ? `bg-${color}-500` : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ValuesCard = ({ values, cardBg, borderColor }) => (
  <div
    className={`${cardBg} rounded-lg border ${borderColor} p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}
  >
    <div className="relative h-16 w-16 mb-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg opacity-20 animate-pulse-slow"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Award className="h-8 w-8 text-purple-400" />
      </div>
    </div>

    <h4 className="text-xl font-bold mb-3">Core Values</h4>
    <p className="text-gray-400 mb-4">
      The principles that guide my work and approach to every project.
    </p>

    <div className="space-y-4">
      {values.map((item, i) => (
        <div key={i} className="group">
          <div className="flex items-center mb-1">
            <div className="h-2 w-2 rounded-full bg-purple-500 mr-3 group-hover:scale-150 transition-transform"></div>
            <div className="text-sm font-medium text-purple-300">
              {item.value}
            </div>
          </div>
          <div className="text-xs text-gray-400 pl-5">{item.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

const FactCard = ({ fact, textColor, cardBg, borderColor, darkMode }) => (
  <div
    className={`${cardBg} rounded-lg border ${borderColor} p-6 transform transition-all duration-300 hover:scale-[1.05] hover:shadow-lg group relative overflow-hidden`}
  >
    {/* Decorative circle */}
    <div
      className={`absolute -right-8 -top-8 w-16 h-16 rounded-full bg-${fact.color}-500/10 group-hover:scale-150 transition-transform duration-500`}
    ></div>

    <div className="relative">
      <div
        className={`w-12 h-12 rounded-full bg-${fact.color}-500/20 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        {fact.icon}
      </div>

      <p
        className={`${textColor} ${
          darkMode
            ? `group-hover:text-${fact.color}-300`
            : `group-hover:text-${fact.color}-600`
        } transition-colors`}
      >
        {fact.fact}
      </p>
    </div>
  </div>
);

const CallToAction = ({ darkMode }) => (
  <div
    className={`px-8 py-10 rounded-xl bg-gradient-to-r from-indigo-900/40 via-indigo-800/30 to-purple-900/40 border border-indigo-500/20 transform transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group max-w-3xl mx-auto relative overflow-hidden`}
  >
    {/* Animated background shapes */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-indigo-600/10 -translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-600/20 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-purple-600/10 translate-x-1/2 translate-y-1/2 group-hover:bg-purple-600/20 transition-colors"></div>
    </div>

    <div className="relative">
      <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">
        Ready to Start a Project Together?
      </h3>
      <p className="mb-6 text-gray-300 max-w-lg mx-auto">
        I'm always looking for new opportunities to create amazing things and
        exciting collaborations. Let's create something amazing together.
      </p>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all duration-300 shadow-lg flex items-center transform group-hover:scale-105">
          <Mail className="mr-2" size={18} />
          Get in Touch
        </button>
      </div>
    </div>
  </div>
);
