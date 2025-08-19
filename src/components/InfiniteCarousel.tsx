"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import { TripImage } from "@/types";

interface InfiniteCarouselProps {
  images: TripImage[];
  onImageClick: (image: TripImage) => void;
  speed?: number;
  pauseOnHover?: boolean;
  isPaused?: boolean;
}

const InfiniteCarousel = ({
  images,
  onImageClick,
  speed = 1,
  pauseOnHover = true,
  isPaused = false,
}: InfiniteCarouselProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Duplicate images for seamless looping
  const duplicatedImages = [...images, ...images];

  // Calculate animation duration based on content width and speed
  const [animationDuration, setAnimationDuration] = useState(30);

  useEffect(() => {
    if (trackRef.current && images.length > 0) {
      // Base duration: more images = slower scroll, adjusted by speed prop
      const baseDuration =
        Math.max(20, Math.min(60, images.length * 6)) / speed;
      setAnimationDuration(baseDuration);
    }
  }, [images.length, speed]);

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // Handle drag end
  const handleDragEnd = (_event: unknown, _info: PanInfo) => {
    setIsDragging(false);
    // Reset position after drag
    x.set(0);
  };

  // Handle image click
  const handleImageClick = (image: TripImage) => {
    if (!isDragging) {
      onImageClick(image);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, image: TripImage, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleImageClick(image);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : images.length - 1;
        setFocusedIndex(prevIndex);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = index < images.length - 1 ? index + 1 : 0;
        setFocusedIndex(nextIndex);
      }
    },
    [images.length, handleImageClick]
  );

  // Check if should pause animation
  const shouldPause = isPaused || isDragging || (pauseOnHover && isHovering);

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-deep/40">
        <div className="text-4xl mb-4">📸</div>
        <p className="font-medium">No images available</p>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        ref={trackRef}
        className={`infinite-track ${shouldPause ? "paused" : "looping"}`}
        style={{
          x: x,
          animationDuration: `${animationDuration}s`,
        }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={
          !shouldPause && trackRef.current
            ? { x: [-trackRef.current.scrollWidth / 2, 0] }
            : {}
        }
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedImages.map((image, index) => (
          <motion.div
            key={`${image.id}-${index}`}
            className="infinite-item group cursor-pointer"
            whileHover={{ scale: 1.035, y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleImageClick(image)}
            onKeyDown={(e) => handleKeyDown(e, image, index % images.length)}
            tabIndex={index < images.length ? 0 : -1}
            role="button"
            aria-label={`View ${image.alt || "image"} ${
              (index % images.length) + 1
            } of ${images.length}`}
            style={{
              outline:
                focusedIndex === index % images.length
                  ? "2px solid var(--primary-dark)"
                  : "none",
            }}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image caption overlay */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 rounded-b-xl text-sm">
                  <p className="truncate">{image.caption}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-primary-dark/30 transition-all duration-200"
            style={{
              backgroundColor:
                index === focusedIndex
                  ? "var(--primary-dark)"
                  : "rgba(181, 128, 255, 0.3)",
              transform: index === focusedIndex ? "scale(1.25)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Keyboard navigation hint */}
      <div className="text-center mt-4 text-xs text-deep/50">
        💡 Use arrow keys to navigate, Enter to view image
      </div>
    </div>
  );
};

export default InfiniteCarousel;
