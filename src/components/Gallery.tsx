'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/mocks/data';
import { BirdCardProps, SvinkaCardProps } from '@/types';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'birds' | 'svinkas'>('birds');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const BirdCard = ({ bird }: { bird: BirdCardProps }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card p-6 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 relative">
        <motion.img
          src={bird.imageUrl}
          alt={bird.name}
          className="w-full h-full object-contain p-6 cursor-pointer transition-all duration-300 group-hover:scale-110"
          onClick={() => openLightbox(bird.imageUrl)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-deep text-lg mb-3 group-hover:text-primary transition-colors duration-300">
          {bird.name}
        </h3>
        <p className="text-sm text-deep/70 mb-4 leading-relaxed">
          {bird.description}
        </p>
        <span className="inline-block bg-gradient-to-r from-countryside/30 to-countryside/20 text-deep/80 text-xs px-3 py-2 rounded-full font-medium border border-countryside/30">
          {bird.habitat}
        </span>
      </div>
    </motion.div>
  );

  const SvinkaCard = ({ svinka }: { svinka: SvinkaCardProps }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="card p-6 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 relative">
        <motion.img
          src={svinka.imageUrl}
          alt={svinka.name}
          className="w-full h-full object-contain p-6 cursor-pointer transition-all duration-300 group-hover:scale-110"
          onClick={() => openLightbox(svinka.imageUrl)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-deep text-lg mb-3 group-hover:text-accent transition-colors duration-300">
          {svinka.name}
        </h3>
        <p className="text-sm text-deep/70 mb-4 leading-relaxed">
          {svinka.description}
        </p>
        <span className="inline-block bg-gradient-to-r from-accent/30 to-accent/20 text-deep/80 text-xs px-3 py-2 rounded-full font-medium border border-accent/30">
          {svinka.personality}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="section-padding bg-gradient-to-br from-white/50 via-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-xl text-gradient mb-6">
            Gallery
          </h1>
          <p className="text-body max-w-3xl mx-auto">
            Explore the beautiful birds of the Russian countryside and meet the adorable{' '}
            <span className="text-accent font-semibold">svinkas</span> who bring joy to every garden.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-effect rounded-2xl p-2 shadow-lg">
            <motion.button
              onClick={() => setActiveTab('birds')}
              className={`px-8 py-3 rounded-xl transition-all duration-300 font-medium ${
                activeTab === 'birds'
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg'
                  : 'text-deep/80 hover:text-primary hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🐦 Birds
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('svinkas')}
              className={`px-8 py-3 rounded-xl transition-all duration-300 font-medium ${
                activeTab === 'svinkas'
                  ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg'
                  : 'text-deep/80 hover:text-accent hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🐷 Svinkas
            </motion.button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {activeTab === 'birds' ? (
              mockData.birds.map((bird, index) => (
                <motion.div
                  key={bird.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BirdCard bird={bird} />
                </motion.div>
              ))
            ) : (
              mockData.svinkas.map((svinka, index) => (
                <motion.div
                  key={svinka.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SvinkaCard svinka={svinka} />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gallery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="heading-md text-deep mb-6">
              About the Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">🐦</div>
                  <div>
                    <h4 className="font-semibold text-deep mb-2">Birds</h4>
                    <p className="text-deep/70 text-sm leading-relaxed">
                      These feathered friends represent the natural beauty 
                      found in Russian gardens and countryside, each with their own unique song and story.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-2xl">🐷</div>
                  <div>
                    <h4 className="font-semibold text-deep mb-2">Svinkas</h4>
                    <p className="text-deep/70 text-sm leading-relaxed">
                      The tiny piglets who bring warmth and joy to every garden. 
                      Each has a distinct personality that reflects the playful spirit of nature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <p className="text-sm text-deep/70 text-center">
                💡 Click on any image to view it larger in the lightbox
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Gallery view"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
                <motion.button
                  onClick={closeLightbox}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg"
                  aria-label="Close lightbox"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
