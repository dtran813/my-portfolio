"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { PROJECTS } from "@/utils/constants";
import { ArrowRight, ExternalLink, Github, PanelsTopLeft } from "lucide-react";
import Image from "next/image";

export default function ProjectSection() {
  const { darkMode, borderColor, accentColor } = useTheme();

  return (
    <section id="projects" className="py-20 relative">
      {/* Background blob */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1/2 bg-indigo-500/5 rounded-l-3xl blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className={`inline-block ${accentColor} font-mono text-sm mb-4`}>
              # FEATURED WORK
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          </div>
          <p
            className={`mt-4 md:mt-0 max-w-md ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A selection of my recent work and personal projects showcasing my
            skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              darkMode={darkMode}
              borderColor={borderColor}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium border ${borderColor} hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all`}
          >
            View All Projects
            <ArrowRight size={20} className="ml-2 mt-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, darkMode, borderColor }) {
  return (
    <div className="group transform transition-all duration-500 hover:-translate-y-2">
      <div
        className={`relative aspect-video overflow-hidden rounded-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border ${borderColor} shadow-lg transform transition-transform duration-500`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10" />
          <div
            className={`absolute top-0 left-0 w-full h-full ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            } flex items-center justify-center`}
          >
            {/* Placeholder for project image - would be replaced with actual project images */}
            <PanelsTopLeft size={60} />
            {/* <Image
              src={project.imageUrl}
              alt="Project"
              width={300}
              height={200}
            /> */}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-white">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-white/70">
                    Short project description
                  </p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github size={16} />
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-2">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {project.description}
        </p>
      </div>
    </div>
  );
}
