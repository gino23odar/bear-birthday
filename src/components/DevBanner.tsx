"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DevBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 shadow-lg"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Close development banner"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DevBanner;
