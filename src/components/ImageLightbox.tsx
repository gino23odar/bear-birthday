"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TripImage } from "@/types";

interface ImageLightboxProps {
  image: TripImage;
  images?: TripImage[];
  initialIndex?: number;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

const ImageLightbox = ({
  image,
  images = [],
  initialIndex = 0,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images.length > 0 ? images[currentIndex] : image;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (images.length > 0) {
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            setCurrentIndex(prevIndex);
            onNavigate?.(prevIndex);
          }
          break;
        case "ArrowRight":
          if (images.length > 0) {
            const nextIndex =
              currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            setCurrentIndex(nextIndex);
            onNavigate?.(nextIndex);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  // Navigate to specific image
  const goToImage = (index: number) => {
    setCurrentIndex(index);
    onNavigate?.(index);
  };

  // Navigate to previous image
  const goToPrevious = () => {
    if (images.length > 0) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setCurrentIndex(prevIndex);
      onNavigate?.(prevIndex);
    }
  };

  // Navigate to next image
  const goToNext = () => {
    if (images.length > 0) {
      const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      onNavigate?.(nextIndex);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-6xl max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative">
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              loading="eager"
            />

            {/* Image Caption */}
            {currentImage.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm"
              >
                <p className="text-center text-lg">{currentImage.caption}</p>
              </motion.div>
            )}
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <motion.button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>

              {/* Next Button */}
              <motion.button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-primary-dark scale-125"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
            aria-label="Close lightbox"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
