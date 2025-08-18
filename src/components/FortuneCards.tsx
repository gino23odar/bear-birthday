'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/mocks/data';
import { FortuneCardProps } from '@/types';

const FortuneCards = () => {
  const [cards, setCards] = useState<FortuneCardProps[]>([]);
  const [selectedCard, setSelectedCard] = useState<FortuneCardProps | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  // Initialize cards with mock data
  useEffect(() => {
    const initialCards = mockData.fortuneMessages.map((message, index) => ({
      ...message,
      id: `card-${index + 1}`,
      isRevealed: false,
    }));
    setCards(initialCards);
  }, []);

  const shuffleCards = () => {
    setIsShuffling(true);
    setSelectedCard(null);
    
    // Reset all cards
    setCards(prev => prev.map(card => ({ ...card, isRevealed: false })));
    
    // Shuffle animation delay
    setTimeout(() => {
      setCards(prev => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5);
        return shuffled.map((card, index) => ({ ...card, id: `card-${index + 1}` }));
      });
      setIsShuffling(false);
    }, 1000);
  };

  const revealCard = (cardId: string) => {
    setCards(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { ...card, isRevealed: true }
          : card
      )
    );
    
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setSelectedCard(card);
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="section-padding bg-gradient-to-br from-primary/5 via-white/50 to-accent/5">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-xl text-gradient mb-6">
            Fortune Cards
          </h1>
          <p className="text-body max-w-3xl mx-auto">
            Discover what the future holds through these mystical cards. 
            Each one carries a message tailored for a philologist&apos;s heart.
          </p>
        </motion.div>

        {/* Shuffle Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={shuffleCards}
            disabled={isShuffling}
            className="btn-primary text-lg px-10 py-4 disabled:opacity-50 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isShuffling ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Shuffling...
              </div>
            ) : (
              <>
                <span className="relative z-10">🔮 Shuffle Cards</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: isShuffling ? [0, 10, -10, 0] : 0,
                y: isShuffling ? [0, -30, 0] : 0,
              }}
              transition={{ 
                duration: isShuffling ? 0.4 : 0.6,
                delay: isShuffling ? index * 0.1 : index * 0.1 + 0.4,
                rotate: {
                  duration: isShuffling ? 0.4 : 0,
                  repeat: isShuffling ? Infinity : 0,
                }
              }}
              className="relative group"
            >
              <motion.div
                className={`card p-8 cursor-pointer h-80 flex flex-col justify-center items-center text-center relative overflow-hidden ${
                  card.isRevealed 
                    ? 'bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20' 
                    : 'bg-gradient-to-br from-deep/5 via-white/80 to-deep/5'
                }`}
                whileHover={{ 
                  scale: card.isRevealed ? 1.02 : 1.05,
                  y: -8,
                  rotateY: card.isRevealed ? 0 : 5,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !card.isRevealed && revealCard(card.id)}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-16 h-16 border border-primary/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border border-accent/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-primary/20 rounded-full"></div>
                </div>

                {!card.isRevealed ? (
                  <motion.div
                    className="space-y-6 relative z-10"
                    animate={{ 
                      rotate: [0, 2, -2, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      className="text-7xl filter drop-shadow-lg"
                      animate={{
                        filter: ["drop-shadow(0 0 20px rgba(217, 168, 255, 0.3))", "drop-shadow(0 0 30px rgba(217, 168, 255, 0.6))", "drop-shadow(0 0 20px rgba(217, 168, 255, 0.3))"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      🔮
                    </motion.div>
                    <div className="text-deep/70">
                      <p className="font-semibold text-lg mb-2">Card {index + 1}</p>
                      <p className="text-sm">Click to reveal your fortune</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-6 relative z-10"
                  >
                    <motion.div
                      className="text-5xl mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {card.theme.includes('Nature') ? '🌿' : 
                       card.theme.includes('Language') ? '📚' :
                       card.theme.includes('Adventure') ? '🌟' :
                       card.theme.includes('Intuition') ? '🔮' :
                       card.theme.includes('Poetry') ? '✍️' : '✨'}
                    </motion.div>
                    <div className="text-deep/80">
                      <motion.p
                        className="text-sm font-semibold text-primary mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {card.theme}
                      </motion.p>
                      <motion.p
                        className="text-sm leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {card.message}
                      </motion.p>
                    </div>
                  </motion.div>
                )}

                {/* Hover effect overlay */}
                {!card.isRevealed && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card p-8 max-w-3xl mx-auto">
            <h3 className="heading-md text-deep mb-6">How to Read Your Fortune</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <p className="text-deep/70">Click the shuffle button to mix the cards</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">2</div>
                  <p className="text-deep/70">Click on any card to reveal your fortune</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                  <p className="text-deep/70">Each card carries a unique message and theme</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">4</div>
                  <p className="text-deep/70">Messages are crafted for philologists</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal for Detailed View */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="card p-10 max-w-lg mx-auto text-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-7xl mb-8"
                >
                  {selectedCard.theme.includes('Nature') ? '🌿' : 
                   selectedCard.theme.includes('Language') ? '📚' :
                   selectedCard.theme.includes('Adventure') ? '🌟' :
                   selectedCard.theme.includes('Intuition') ? '🔮' :
                   selectedCard.theme.includes('Poetry') ? '✍️' : '✨'}
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="heading-md text-primary mb-6"
                >
                  {selectedCard.theme}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-body mb-8 leading-relaxed"
                >
                  {selectedCard.message}
                </motion.p>
                
                <motion.button
                  onClick={closeModal}
                  className="btn-accent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FortuneCards;
