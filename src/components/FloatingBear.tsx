'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBear() {
  const [open, setOpen] = React.useState(false);

  // prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Floating bear button */}
      <button
        className="floating-bear"
        aria-label="Open private note"
        onClick={() => setOpen(true)}
        title="Open private note"
      >
        🐻
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="card max-w-xl w-full mx-4 md:mx-0"
              role="dialog"
              aria-modal="true"
              aria-label="Private note modal"
            >
              <div className="flex items-start justify-between">
                <h3 className="heading-lg">Private Note</h3>
                <button
                  className="btn-ghost"
                  aria-label="Close private note"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              <p className="text-caption mt-2">
                A private place to write something for Bear. Nothing is sent anywhere — this is local by default.
              </p>

              <textarea
                className="mt-4 w-full p-3 rounded-lg border border-white/20 bg-white/95 text-[var(--deep)]"
                rows={6}
                placeholder="Write your message here..."
                aria-label="Private note content"
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="btn-accent"
                  onClick={() => {
                    // simple placeholder action — replace with persistence if you want
                    setOpen(false);
                    // optionally: show toast or save to localStorage
                    try { localStorage.setItem('birthdayBear_privateNote', 'saved'); } catch {}
                  }}
                >
                  Save
                </button>
                <button className="btn-ghost" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

