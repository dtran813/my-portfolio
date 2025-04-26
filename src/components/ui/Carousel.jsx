"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Carousel({ items, itemsPerSlide = 2, renderItem }) {
  const { darkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideItems = () => {
    const start = currentSlide * itemsPerSlide;
    return items.slice(start, start + itemsPerSlide);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 py-4">
            {getCurrentSlideItems().map((item) => renderItem(item))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 -left-5 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        } shadow-lg z-10 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className={`absolute top-1/2 -right-5 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        } shadow-lg z-10 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? `bg-indigo-500 w-5`
                : darkMode
                ? "bg-gray-600"
                : "bg-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
