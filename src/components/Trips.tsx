"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trip, TripImage, CreateTripRequest } from "@/types";
import TripCollectionModal from "./TripCollectionModal";
import TripCard from "./TripCard";

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "1",
      title: "Summer by the River",
      description:
        "A peaceful afternoon spent by the gentle flowing river, watching birds and enjoying the countryside breeze.",
      location: "Russian Countryside",
      date: "2024-07-15",
      images: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
          alt: "Peaceful river scene",
          caption: "The gentle flow of the river",
          uploadedAt: "2024-07-15T10:00:00Z",
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          alt: "Forest path",
          caption: "Walking through the green forest",
          uploadedAt: "2024-07-15T11:00:00Z",
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
          alt: "Sunset over water",
          caption: "Golden hour reflections",
          uploadedAt: "2024-07-15T18:00:00Z",
        },
        {
          id: "4",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
          alt: "Wildflowers",
          caption: "Summer blooms",
          uploadedAt: "2024-07-15T12:00:00Z",
        },
      ],
      createdAt: "2024-07-15T09:00:00Z",
      updatedAt: "2024-07-15T11:00:00Z",
    },
    {
      id: "2",
      title: "Garden Adventures",
      description:
        "Exploring the beautiful gardens and discovering hidden corners filled with colorful flowers and ancient trees.",
      location: "Botanical Gardens",
      date: "2024-06-20",
      images: [
        {
          id: "5",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
          alt: "Rose garden",
          caption: "Pink roses in bloom",
          uploadedAt: "2024-06-20T14:00:00Z",
        },
        {
          id: "6",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80",
          alt: "Ancient oak tree",
          caption: "Centuries-old wisdom",
          uploadedAt: "2024-06-20T15:00:00Z",
        },
      ],
      createdAt: "2024-06-20T10:00:00Z",
      updatedAt: "2024-06-20T16:00:00Z",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedImage, setSelectedImage] = useState<TripImage | null>(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedCollectionTrip, setSelectedCollectionTrip] =
    useState<Trip | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createTrip = (tripData: CreateTripRequest) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      ...tripData,
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTrips((prev) => [newTrip, ...prev]);
    setShowCreateForm(false);
  };

  const uploadImage = (tripId: string, file: File, caption?: string) => {
    // In a real app, this would upload to Cloudinary or similar service
    // For now, we'll create a mock image URL
    const mockImageUrl = URL.createObjectURL(file);

    const newImage: TripImage = {
      id: Date.now().toString(),
      url: mockImageUrl,
      alt: file.name,
      caption,
      uploadedAt: new Date().toISOString(),
    };

    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              images: [...trip.images, newImage],
              updatedAt: new Date().toISOString(),
            }
          : trip
      )
    );
  };

  const deleteTrip = (tripId: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
  };

  const deleteImage = (tripId: string, imageId: string) => {
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              images: trip.images.filter((img) => img.id !== imageId),
              updatedAt: new Date().toISOString(),
            }
          : trip
      )
    );
  };

  const openCollectionModal = (trip: Trip) => {
    setSelectedCollectionTrip(trip);
    setShowCollectionModal(true);
  };

  return (
    <div className="section-padding bg-gradient-to-br from-white/50 via-[var(--primary-dark)]/5 to-accent/5">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="heading-xl mb-6"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-dark), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Travel Memories
          </h1>
          <p className="text-body max-w-3xl mx-auto">
            Capture and share your adventures in the Russian countryside, by the
            rivers, and in the beautiful gardens.
          </p>
        </motion.div>

        {/* Create Trip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={() => setShowCreateForm(true)}
            className="text-lg px-10 py-4 rounded-xl font-semibold shadow-lg transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-dark), var(--accent))",
              color: "white",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ✈️ Create New Trip
          </motion.button>
        </motion.div>

        {/* Trips Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <TripCard
                trip={trip}
                onViewCollection={openCollectionModal}
                onViewTrip={setSelectedTrip}
                onAddPhoto={(tripId) => {
                  // Handle photo upload for specific trip
                  fileInputRef.current?.click();
                }}
                onDeleteTrip={deleteTrip}
                onDeleteImage={deleteImage}
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Create Trip Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <CreateTripModal
              onClose={() => setShowCreateForm(false)}
              onSubmit={createTrip}
            />
          )}
        </AnimatePresence>

        {/* View Trip Modal */}
        <AnimatePresence>
          {selectedTrip && (
            <ViewTripModal
              trip={selectedTrip}
              onClose={() => setSelectedTrip(null)}
              onDeleteImage={deleteImage}
            />
          )}
        </AnimatePresence>

        {/* Image Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <ImageLightbox
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </AnimatePresence>

        {/* Trip Collection Modal */}
        <AnimatePresence>
          {showCollectionModal && selectedCollectionTrip && (
            <TripCollectionModal
              trip={selectedCollectionTrip}
              onClose={() => {
                setShowCollectionModal(false);
                setSelectedCollectionTrip(null);
              }}
              layoutId={`trip-card-${selectedCollectionTrip.id}`}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Create Trip Modal Component
const CreateTripModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: CreateTripRequest) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.location) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="card p-8 max-w-lg mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[var(--primary-dark)]/20 hover:bg-[var(--primary-dark)]/30 rounded-full flex items-center justify-center text-[var(--primary-dark)] transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        <h3 className="heading-lg text-deep mb-6">Create New Trip</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-deep mb-2">
              Trip Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-dark)] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              placeholder="e.g., Summer by the River"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-dark)] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              placeholder="e.g., Russian Countryside"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-dark)] focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-dark)] focus:border-transparent resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
              placeholder="Describe your trip..."
              required
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-dark), var(--accent))",
                boxShadow: "0 4px 15px rgba(181, 128, 255, 0.3)",
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Trip
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Trip Modal Component
const ViewTripModal = ({
  trip,
  onClose,
  onDeleteImage,
}: {
  trip: Trip;
  onClose: () => void;
  onDeleteImage: (tripId: string, imageId: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        className="card p-8 max-w-4xl mx-auto relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[var(--primary-dark)]/20 hover:bg-[var(--primary-dark)]/30 rounded-full flex items-center justify-center text-[var(--primary-dark)] transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        <div className="mb-6">
          <h3 className="heading-lg text-deep mb-2">{trip.title}</h3>
          <p className="text-deep/60 mb-2">
            📍 {trip.location} • 📅 {new Date(trip.date).toLocaleDateString()}
          </p>
          <p className="text-deep/70 leading-relaxed">{trip.description}</p>
        </div>

        {trip.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trip.images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full aspect-square object-cover rounded-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 rounded-b-lg text-sm">
                    {image.caption}
                  </div>
                )}
                <motion.button
                  onClick={() => onDeleteImage(trip.id, image.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-deep/40">
            <div className="text-4xl mb-4">📸</div>
            <p className="font-medium">No images yet</p>
            <p className="text-sm mt-2">
              Add some photos to capture your memories
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Image Lightbox Component
const ImageLightbox = ({
  image,
  onClose,
}: {
  image: TripImage;
  onClose: () => void;
}) => {
  return (
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
        className="relative max-w-5xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
        />
        {image.caption && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm">
            <p className="text-center">{image.caption}</p>
          </div>
        )}
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
  );
};

export default Trips;
