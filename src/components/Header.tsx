"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isAudioExpanded, setIsAudioExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/llm", label: "LLM Playground" },
    { href: "/fortune", label: "Fortune Cards" },
    { href: "/gallery", label: "Gallery" },
    { href: "/trips", label: "Trips" },
    { href: "/about", label: "About" },
  ];

  // scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close audio menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-audio-menu]")) {
        setIsAudioMenuOpen(false);
      }
    };

    if (isAudioMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAudioMenuOpen]);

  // Initialize audio
  useEffect(() => {
    // Create audio element
    const audio = new Audio("/assets/audio/ambient-river.mp3");
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    // Load audio preferences from localStorage
    const savedVolume = localStorage.getItem("audio-volume");
    const savedMuted = localStorage.getItem("audio-muted");

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      audio.volume = vol;
    }

    if (savedMuted) {
      const muted = JSON.parse(savedMuted);
      setIsMuted(muted);
      audio.muted = muted;
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update audio when volume or mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;

      // Save preferences
      localStorage.setItem("audio-volume", volume.toString());
      localStorage.setItem("audio-muted", isMuted.toString());
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Only autoplay if not muted (browser policy)
      if (!isMuted) {
        audioRef.current.play().catch(() => {
          // Autoplay failed, keep muted
          setIsMuted(true);
        });
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Birthday Bear home"
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl"
              aria-hidden
            >
              🐻
            </motion.div>
            <div className="flex flex-col">
              <span className="heading-lg text-gradient font-semibold">
                Birthday Bear
              </span>
              <span className="text-xs text-primary-dark/70 font-medium">
                {language === "en" ? "English" : "Русский"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-6"
            aria-label="Primary"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-[var(--deep)]/85 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute -bottom-2 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Audio & Language Menu */}
            <div className="relative" data-audio-menu>
              <motion.button
                onClick={() => setIsAudioMenuOpen(!isAudioMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 text-[var(--deep)]/85 hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Audio and language settings"
                aria-expanded={isAudioMenuOpen}
              >
                <span>⚙️</span>
                <span className="text-xs px-2 py-1 bg-primary-dark/20 rounded-full text-primary-dark">
                  {language.toUpperCase()}
                </span>
                <motion.span
                  animate={{ rotate: isAudioMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isAudioMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Language Toggle */}
                      <div>
                        <h4 className="text-sm font-semibold text-deep mb-3">
                          Language
                        </h4>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setLanguage("en")}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              language === "en"
                                ? "bg-white text-deep shadow-sm"
                                : "text-gray-600 hover:text-deep"
                            }`}
                          >
                            English
                          </button>
                          <button
                            onClick={() => setLanguage("ru")}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                              language === "ru"
                                ? "bg-white text-deep shadow-sm"
                                : "text-gray-600 hover:text-deep"
                            }`}
                          >
                            Русский
                          </button>
                        </div>
                      </div>

                      {/* Audio Controls */}
                      <div>
                        <h4 className="text-sm font-semibold text-deep mb-3">
                          Ambient Audio
                        </h4>
                        <div className="space-y-3">
                          {/* Main Controls */}
                          <div className="flex items-center gap-3">
                            {/* Play/Pause Button */}
                            <motion.button
                              onClick={togglePlay}
                              className="w-10 h-10 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={
                                isPlaying
                                  ? "Pause ambient audio"
                                  : "Play ambient audio"
                              }
                            >
                              {isPlaying ? "⏸️" : "▶️"}
                            </motion.button>

                            {/* Mute Button */}
                            <motion.button
                              onClick={toggleMute}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                isMuted
                                  ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                                  : "bg-primary-dark/20 text-primary-dark hover:bg-primary-dark/30"
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={
                                isMuted ? "Unmute audio" : "Mute audio"
                              }
                              aria-pressed={isMuted}
                            >
                              {isMuted ? "🔇" : "🔊"}
                            </motion.button>

                            {/* Expand Button */}
                            <motion.button
                              onClick={() =>
                                setIsAudioExpanded(!isAudioExpanded)
                              }
                              className="w-8 h-8 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={
                                isAudioExpanded
                                  ? "Collapse audio controls"
                                  : "Expand audio controls"
                              }
                              aria-expanded={isAudioExpanded}
                            >
                              {isAudioExpanded ? "◀️" : "▶️"}
                            </motion.button>
                          </div>

                          {/* Expanded Controls */}
                          <AnimatePresence>
                            {isAudioExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3"
                              >
                                {/* Volume Slider */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-primary-dark">
                                    🔊
                                  </span>
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) =>
                                      handleVolumeChange(
                                        parseFloat(e.target.value)
                                      )
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    aria-label="Volume control"
                                  />
                                  <span className="text-xs text-primary-dark w-8 text-right">
                                    {Math.round(volume * 100)}%
                                  </span>
                                </div>

                                {/* Equalizer */}
                                {isPlaying && !isMuted && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-center"
                                  >
                                    <div className="flex gap-1">
                                      {[...Array(4)].map((_, i) => (
                                        <motion.div
                                          key={i}
                                          className="w-1 bg-primary-dark rounded-full"
                                          animate={{
                                            height: [8, 16, 8],
                                          }}
                                          transition={{
                                            duration: 0.8,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut",
                                          }}
                                        />
                                      ))}
                                    </div>
                                  </motion.div>
                                )}

                                {/* Audio Info */}
                                <div className="text-xs text-primary-dark/70 text-center">
                                  🌊 River & Birds Ambient
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[var(--deep)] bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <motion.rect
                  width="24"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={
                    isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                  }
                />
                <motion.rect
                  y="10"
                  width="24"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.rect
                  y="20"
                  width="24"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={
                    isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="lg:hidden mt-3 border-t border-white/10 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-primary bg-primary/6 border-l-4 border-primary"
                          : "text-[var(--deep)]/85 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Audio & Language Controls */}
                <div className="px-4 py-3 space-y-4 border-t border-white/10 pt-4">
                  {/* Language Toggle */}
                  <div>
                    <h4 className="text-sm font-semibold text-deep mb-2">
                      Language
                    </h4>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setLanguage("en")}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          language === "en"
                            ? "bg-white text-deep shadow-sm"
                            : "text-gray-600 hover:text-deep"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setLanguage("ru")}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          language === "ru"
                            ? "bg-white text-deep shadow-sm"
                            : "text-gray-600 hover:text-deep"
                        }`}
                      >
                        Русский
                      </button>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div>
                    <h4 className="text-sm font-semibold text-deep mb-2">
                      Audio
                    </h4>
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={togglePlay}
                        className="w-10 h-10 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? "⏸️" : "▶️"}
                      </motion.button>
                      <motion.button
                        onClick={toggleMute}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                          isMuted
                            ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            : "bg-primary-dark/20 text-primary-dark hover:bg-primary-dark/30"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted ? "🔇" : "🔊"}
                      </motion.button>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) =>
                            handleVolumeChange(parseFloat(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
