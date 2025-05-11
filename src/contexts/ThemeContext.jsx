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
    bgColor: darkMode ? "bg-gray-800" : "bg-gray-200",
    textColor: darkMode ? "text-gray-300" : "text-gray-600",
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
