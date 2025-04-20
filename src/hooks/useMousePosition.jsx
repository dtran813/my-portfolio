"use client";

import { useState, useEffect, use } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getParrallaxStyle = (elementRef, depth) => {
    if (!elementRef.current) return {};

    const bounds = elementRef.current.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const moveX = ((mousePosition.x - centerX) / (bounds.width / 2)) * depth;
    const moveY = ((mousePosition.y - centerY) / (bounds.height / 2)) * depth;

    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
    };
  };

  return {
    mousePosition,
    getParrallaxStyle,
  };
};
