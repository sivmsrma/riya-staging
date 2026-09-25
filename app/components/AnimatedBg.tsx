"use client";

import { motion } from "framer-motion";

export default function AnimatedBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary pink blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-pink-600/20 blur-[160px] rounded-full"
      />
      {/* Rose blob bottom-right */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15], x: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-rose-500/20 blur-[160px] rounded-full"
      />
      {/* Subtle purple accent */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-violet-600/10 blur-[130px] rounded-full"
      />
      {/* Scan line */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/10 to-transparent"
        style={{ top: "50%" }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(244,114,182,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,114,182,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
