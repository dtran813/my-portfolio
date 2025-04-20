"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    darkMode,
    toggleDarkMode,
    bgColor: darkMode ? "bg-gray-900" : "bg-gray-100",
    textColor: darkMode ? "text-gray-100" : "text-gray-900",
    cardBg: darkMode ? "bg-gray-800" : "bg-white",
    accentColor: darkMode ? "text-indigo-400" : "text-indigo-600",
    borderColor: darkMode ? "border-gray-700" : "border-gray-300",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
