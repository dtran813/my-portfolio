"use client";

import { useState, useEffect } from "react";

export const useTypingEffect = (strings, options = {}) => {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseBeforeDelete = 1500,
    pauseBeforeNext = 2000,
  } = options;

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentString = strings[currentIndex];

        if (isDeleting) {
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % strings.length);
            return;
          }
          setCurrentText((prev) => prev.slice(0, -1));
          return;
        }

        if (currentText === currentString) {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
          return;
        }

        setCurrentText(currentString.slice(0, currentText.length + 1));
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, strings]);

  return { displayText: currentText };
};
