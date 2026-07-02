"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLoaderProps {
  onComplete: () => void;
}

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const bootLines = [
    "> INITIALIZING_CORE_SYSTEM...",
    "> [OK] LOADING_DRIVERS: ARCHITECT_V2.0",
    "> [OK] ESTABLISHING_SECURE_LINK...",
    "> [OK] FETCHING_PROJECT_DATABASE...",
    "> [OK] CALIBRATING_WORKSPACE...",
    "> ACCESS_GRANTED. SYSTEM_READY."
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < bootLines.length) {
        setLines((prev) => [...prev, bootLines[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 400); // match glitch out animation duration
        }, 600);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "hue-rotate(90deg) skewX(10deg)",
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
          className="fixed inset-0 bg-[#000000] z-[9999] flex items-center justify-center p-8 font-mono select-none"
        >
          <div className="w-full max-w-[600px] text-[#00FF41] text-base md:text-lg leading-relaxed tracking-wide">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="mb-2 whitespace-pre-wrap"
              >
                {line}
                {idx === lines.length - 1 && idx < bootLines.length - 1 && (
                  <span className="cursor inline-block w-2.5 h-[1.2em] bg-[#00FF41] ml-1 animate-pulse" />
                )}
                {idx === bootLines.length - 1 && (
                  <span className="cursor inline-block w-2.5 h-[1.2em] bg-[#00FF41] ml-1 animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
