"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AudioControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="audio-controls">
        {/* Main Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            className="w-10 h-10 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isPlaying ? "Pause ambient audio" : "Play ambient audio"
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
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            aria-pressed={isMuted}
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>

          {/* Expand Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isExpanded ? "Collapse audio controls" : "Expand audio controls"
            }
            aria-expanded={isExpanded}
          >
            {isExpanded ? "◀️" : "▶️"}
          </motion.button>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-3"
            >
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary-dark">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) =>
                    handleVolumeChange(parseFloat(e.target.value))
                  }
                  className="volume-slider"
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
                  <div className="equalizer">
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
                    <div className="equalizer-bar"></div>
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
    </motion.div>
  );
};

export default AudioControls;
