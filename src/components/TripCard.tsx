"use client";

import { motion } from "framer-motion";
import { Trip, TripImage } from "@/types";

interface TripCardProps {
  trip: Trip;
  onViewCollection: (trip: Trip) => void;
  onViewTrip: (trip: Trip) => void;
  onAddPhoto: (tripId: string) => void;
  onDeleteTrip: (tripId: string) => void;
  onDeleteImage: (tripId: string, imageId: string) => void;
  selectedImage: TripImage | null;
  onImageSelect: (image: TripImage | null) => void;
}

const TripCard = ({
  trip,
  onViewCollection,
  onViewTrip,
  onAddPhoto,
  onDeleteTrip,
  onDeleteImage,
  selectedImage,
  onImageSelect,
}: TripCardProps) => {
  return (
    <motion.div
      layoutId={`trip-card-${trip.id}`}
      className="card p-6 hover:shadow-2xl transition-all duration-300 group border-primary-dark/20 hover:border-primary-dark/40"
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        boxShadow: "0 10px 25px -5px rgba(181, 128, 255, 0.1)",
        border: "1px solid rgba(181, 128, 255, 0.2)",
      }}
    >
      {/* Trip Header */}
      <div className="mb-4">
        <h3 className="font-bold text-deep text-xl mb-2 group-hover:text-[var(--primary-dark)] transition-colors duration-300">
          {trip.title}
        </h3>
        <p className="text-sm text-deep/60 mb-2">
          📍 {trip.location} • 📅 {new Date(trip.date).toLocaleDateString()}
        </p>
        <p className="text-deep/70 text-sm leading-relaxed">
          {trip.description}
        </p>
      </div>

      {/* Trip Images Preview */}
      {trip.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {trip.images.slice(0, 4).map((image) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
                onClick={() => onImageSelect(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          {trip.images.length > 4 && (
            <p className="text-xs text-deep/60 mt-2 text-center">
              +{trip.images.length - 4} more images
            </p>
          )}
        </div>
      )}

      {/* Trip Actions */}
      <div className="flex flex-col gap-3">
        {/* See Collection Button */}
        {trip.images.length > 0 && (
          <motion.button
            onClick={() => onViewCollection(trip)}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-dark), var(--accent))",
              boxShadow: "0 4px 15px rgba(181, 128, 255, 0.3)",
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: "0 8px 25px rgba(181, 128, 255, 0.4)",
              filter: "brightness(1.1)",
            }}
            whileTap={{ scale: 0.98 }}
            layoutId={`trip-cta-${trip.id}`}
          >
            🖼️ See collection
          </motion.button>
        )}

        {/* Other Actions */}
        <div className="flex gap-2">
          <motion.button
            onClick={() => onViewTrip(trip)}
            className="btn-secondary flex-1 text-sm py-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            👁️ View Trip
          </motion.button>
          <motion.button
            onClick={() => onAddPhoto(trip.id)}
            className="btn-accent text-sm py-2 px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📸 Add Photo
          </motion.button>
          <motion.button
            onClick={() => onDeleteTrip(trip.id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🗑️
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TripCard;
