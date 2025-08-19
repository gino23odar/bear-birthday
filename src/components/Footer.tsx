"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-[var(--deep)] via-[var(--deep)]/95 to-[var(--deep)]/90 text-white py-16 mt-16 relative overflow-hidden"
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        {/* Floating hearts */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-8 text-2xl text-[var(--primary)]/40"
        >
          💝
        </motion.div>

        {/* Floating stars */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-16 text-xl text-[var(--accent)]/40"
        >
          ✨
        </motion.div>

        {/* Floating leaves */}
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 text-lg text-[var(--countryside)]/40"
        >
          🌿
        </motion.div>

        {/* Subtle gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-[var(--accent)]/10 to-[var(--primary)]/10 rounded-full blur-sm"></div>

        {/* Decorative lines */}
        <div className="absolute top-1/2 left-0 w-20 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-20 h-px bg-gradient-to-l from-transparent via-[var(--accent)]/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-3xl"
              >
                🐻
              </motion.div>
              <h3 className="text-2xl font-bold text-gradient">
                Birthday Bear
              </h3>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              {language === "en"
                ? "Celebrating the philologist who finds poetry in nature and joy in tiny creatures."
                : "Празднуем филолога, который находит поэзию в природе и радость в крошечных существах."}
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                className="w-10 h-10 bg-[var(--primary)]/20 rounded-full flex items-center justify-center text-[var(--primary)] transition-colors"
              >
                💝
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                className="w-10 h-10 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-[var(--accent)] transition-colors"
              >
                🌿
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold text-gradient">Quick Links</h4>
            <ul className="space-y-3">
              {[
                {
                  href: "/llm",
                  label: "LLM Playground",
                  icon: "✨",
                  description: "AI-powered text and image generation",
                },
                {
                  href: "/fortune",
                  label: "Fortune Cards",
                  icon: "🔮",
                  description: "Daily wisdom and predictions",
                },
                {
                  href: "/gallery",
                  label: "Gallery",
                  icon: "🖼️",
                  description: "Beautiful nature photography collection",
                },
                {
                  href: "/trips",
                  label: "Trips",
                  icon: "✈️",
                  description: "Travel memories and adventures",
                },
                {
                  href: "/about",
                  label: "About",
                  icon: "ℹ️",
                  description: "Learn more about Birthday Bear",
                },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.36, delay: 0.26 + index * 0.06 }}
                >
                  <motion.a
                    href={link.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-[var(--primary-dark)] transition-all duration-300 group p-2 rounded-lg hover:bg-white/5"
                    whileHover={{ x: 4 }}
                    aria-label={`${link.label} - ${link.description}`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="group-hover:font-medium">
                      {link.label}
                    </span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Credits & Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold text-gradient">Information</h4>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Built with ❤️ using Next.js, TypeScript, TailwindCSS
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl border border-[var(--primary)]/20">
                <p className="text-xs text-gray-400">
                  © {new Date().getFullYear()} Birthday Bear. All rights
                  reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 mt-12 pt-8 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              This site runs locally with mock data by default. Connect to
              ComfyUI + WAN 2.2 to enable LLM features.
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <span>Made with 🎨</span>
              <span>•</span>
              <span>Powered by Next.js</span>
              <span>•</span>
              <span>Styled with TailwindCSS</span>
              <span>•</span>
              <span>Animated with Framer Motion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
