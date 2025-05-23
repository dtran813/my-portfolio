"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import TechnologiesSection from "@/components/sections/TechnologiesSection";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { bgColor, textColor } = useTheme();
  return (
    <div
      className={`${bgColor} ${textColor} min-h-screen transition-colors duration-300 relative`}
    >
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ExperienceSection />
        <TechnologiesSection />
      </main>

      <Footer />
    </div>
  );
}
