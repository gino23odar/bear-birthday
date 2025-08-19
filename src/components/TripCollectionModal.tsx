"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trip, TripImage } from "@/types";
import InfiniteCarousel from "./InfiniteCarousel";
import ImageLightbox from "./ImageLightbox";

interface TripCollectionModalProps {
  trip: Trip;
  onClose: () => void;
  layoutId: string;
}

const TripCollectionModal = ({
  trip,
  onClose,
  layoutId,
}: TripCollectionModalProps) => {
  const [selectedImage, setSelectedImage] = useState<TripImage | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle image click from carousel
  const handleImageClick = (image: TripImage) => {
    setSelectedImage(image);
  };

  // Handle shuffle effect
  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 2000);
  };

  // Handle lightbox navigation
  const handleLightboxNavigate = (_index: number) => {
    // This could be used to sync with carousel position if needed
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[rgba(8,12,20,0.6)] backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            layoutId={layoutId}
            className="card max-w-6xl mx-auto relative max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid var(--primary-dark)",
              boxShadow: "0 25px 50px -12px rgba(181, 128, 255, 0.25)",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-b border-primary-dark/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 id="modal-title" className="heading-lg text-deep mb-2">
                    {trip.title}
                  </h2>
                  <p className="text-deep/60">
                    📍 {trip.location} • 📅{" "}
                    {new Date(trip.date).toLocaleDateString()} • 📸{" "}
                    {trip.images.length} images
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Shuffle Button */}
                  <motion.button
                    onClick={handleShuffle}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isShuffling
                        ? "bg-primary-dark text-white scale-110"
                        : "bg-primary-dark/20 text-primary-dark hover:bg-primary-dark/30"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Shuffle images"
                  >
                    🔀
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full flex items-center justify-center text-primary-dark transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close collection"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {trip.description && (
                <p className="text-deep/70 leading-relaxed">
                  {trip.description}
                </p>
              )}
            </motion.div>

            {/* Content */}
            <div className="p-6">
              {trip.images.length > 0 ? (
                <InfiniteCarousel
                  images={trip.images}
                  onImageClick={handleImageClick}
                  isPaused={isShuffling}
                  speed={isShuffling ? 2 : 1}
                  pauseOnHover={true}
                />
              ) : (
                <div className="text-center py-12 text-deep/40">
                  <div className="text-4xl mb-4">📸</div>
                  <p className="font-medium">No images yet</p>
                  <p className="text-sm mt-2">
                    Add some photos to capture your memories
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <ImageLightbox
            image={selectedImage}
            images={trip.images}
            initialIndex={trip.images.findIndex(
              (img) => img.id === selectedImage.id
            )}
            onClose={() => setSelectedImage(null)}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TripCollectionModal;
