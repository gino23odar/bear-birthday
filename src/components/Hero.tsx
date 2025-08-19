"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const [showLoveNote, setShowLoveNote] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-main-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`large-${i}`}
            className="absolute w-3 h-3 bg-accent/15 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle waves */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-countryside/30 via-countryside/20 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center lg:text-left container-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <motion.h1
              className="heading-xl text-gradient mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {language === "en"
                ? "Happy Birthday, Bear"
                : "С Днем Рождения, Медвежонок"}
              <span className="block text-4xl md:text-6xl lg:text-7xl mt-4">
                🐻
              </span>
            </motion.h1>

            {/* Language Toggle for Hero */}
            <motion.div
              className="flex justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex bg-white/20 backdrop-blur-sm rounded-full p-1 border border-white/30">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    language === "en"
                      ? "bg-white text-deep shadow-sm"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ru")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    language === "ru"
                      ? "bg-white text-deep shadow-sm"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  RU
                </button>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-body max-w-2xl lg:max-w-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {language === "en"
                ? "For the philologist who finds poetry in river currents, wisdom in bird songs, and joy in tiny svinkas."
                : "Для филолога, который находит поэзию в течении рек, мудрость в пении птиц и радость в крошечных свинках."}
            </motion.p>

            {/* Call to Action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="/llm"
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "en"
                  ? "Try the LLM Playground"
                  : "Попробовать LLM Площадку"}
              </motion.a>
              <motion.a
                href="/fortune"
                className="btn-accent text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "en"
                  ? "Get Your Fortune"
                  : "Получить Предсказание"}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Animated Bird */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="relative left-[-1070px]"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="text-primary drop-shadow-2xl"
                animate={{
                  scale: [0.7, 1.1, 1.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Enhanced bird shape */}
                <defs>
                  <linearGradient
                    id="birdGrad"
                    x1="0%"
                    y1="0%"
                    x2="10%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#D9A8FF", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#FFB4A2", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                {/* Bird head/body shape - centered at (100, 110) */}
                <path
                  d="M 40 100 Q 60 80 80 100 Q 100 120 120 100 Q 140 80 160 100 L 160 120 Q 140 140 120 120 Q 100 100 80 120 Q 60 140 40 120 Z"
                  fill="url(#birdGrad)"
                  opacity="0.9"
                />
                {/* Bird eyes - properly aligned with the head shape */}
                <circle cx="75" cy="105" r="4" fill="white" opacity="0.8" />
                <circle cx="125" cy="105" r="4" fill="white" opacity="0.8" />
                {/* Bird beak - centered and aligned with the head */}
                <path
                  d="M 100 100 L 100 85 M 95 90 L 105 90"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.8"
                />

                {/* Decorative elements */}
                <motion.path
                  d="M 60 80 Q 50 70 40 80"
                  stroke="#FFB4A2"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                  animate={{
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button - Bear Heart */}
      <motion.div
        className="fixed bottom-8 left-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.button
          className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center text-white text-3xl hover:shadow-primary/50"
          whileHover={{
            scale: 1.15,
            rotate: [0, -10, 10, 0],
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowLoveNote(true)}
          aria-label="Private love note"
          style={{
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        >
          💝
        </motion.button>
      </motion.div>

      {/* Love Note Modal */}
      <AnimatePresence>
        {showLoveNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowLoveNote(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="card p-8 max-w-md mx-auto text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setShowLoveNote(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              <div className="text-6xl mb-6">💝</div>
              <h3 className="heading-md text-primary mb-4">
                {language === "en" ? "A Private Note" : "Личная Записка"}
              </h3>
              <p className="text-body mb-6">
                {language === "en"
                  ? "Dear Bear, on your special day, may your love for language and nature continue to inspire. You bring beauty to every word and joy to every heart you touch."
                  : "Дорогой Медвежонок, в твой особенный день пусть твоя любовь к языку и природе продолжает вдохновлять. Ты приносишь красоту каждому слову и радость каждому сердцу, которого касаешься."}
              </p>
              <p className="text-caption text-accent">
                {language === "en"
                  ? "With love and admiration,"
                  : "С любовью и восхищением,"}
                <br />
                {language === "en" ? "Night Penguin 🐧" : "Ночной Пингвин 🐧"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
