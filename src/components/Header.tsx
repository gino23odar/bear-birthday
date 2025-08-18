'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/llm', label: 'LLM Playground' },
    { href: '/fortune', label: 'Fortune Cards' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/trips', label: 'Trips' },
    { href: '/about', label: 'About' },
  ];

  // scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" aria-label="Birthday Bear home">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-3xl"
              aria-hidden
            >
              🐻
            </motion.div>
            <span className="heading-lg text-gradient font-semibold">Birthday Bear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Primary">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    isActive(item.href) ? 'text-primary' : 'text-[var(--deep)]/85 hover:text-primary'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <motion.rect
                  width="24"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
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
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
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
              animate={{ opacity: 1, height: 'auto' }}
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
                          ? 'text-primary bg-primary/6 border-l-4 border-primary'
                          : 'text-[var(--deep)]/85 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
