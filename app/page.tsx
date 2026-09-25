"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedBg from "./components/AnimatedBg";
import Navbar from "./components/Navbar";
import { ChevronRight, Terminal } from "lucide-react";

const BOOT_LINES = [
  "Initializing riya-staging@v1.0.0...",
  "Loading emotional dependencies...",
  "Mounting: patience.module ✓",
  "Mounting: no-rush.config ✓",
  "Mounting: genuine-feelings.ts ✓",
  "Resolving legacy conflicts... done",
  "Sprint 1 environment ready.",
  "> System online. One step at a time.",
];

export default function LandingPage() {
  const router = useRouter();
  const [bootIndex, setBootIndex] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    if (bootIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setBootIndex((i) => i + 1), 380);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setBootDone(true);
        setTimeout(() => setShowCTA(true), 600);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [bootIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 gap-12">
        
        {/* Terminal Boot Sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-2xl border border-white/10 bg-[#080810]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-pink-950/30">
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-pink-400" />
                riya-staging — boot sequence
              </span>
              <div className="w-16" />
            </div>

            {/* Boot lines */}
            <div className="p-6 font-mono text-sm space-y-2 min-h-[220px]">
              <AnimatePresence>
                {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-center gap-2 ${
                      i === BOOT_LINES.length - 1
                        ? "text-pink-400 font-semibold"
                        : i < bootIndex - 1
                        ? "text-slate-500"
                        : "text-emerald-400"
                    }`}
                  >
                    <span className="text-pink-500/40 select-none">{">"}</span>
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              {!bootDone && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2.5 h-4 bg-pink-500/70 align-middle"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero text */}
        <AnimatePresence>
          {bootDone && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xs font-mono text-pink-500/70 tracking-[0.3em] uppercase"
              >
                ENV: STAGING // BRANCH: feat/take-it-slow
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Hey Riya,{" "}
                <br />
                <span className="shimmer-text">You were right.</span>
              </h1>


            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(244,114,182,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/bug-report")}
                className="relative group px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_10px_30px_rgba(244,114,182,0.3)] overflow-hidden flex items-center gap-2 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">Read the bug report</span>
                <ChevronRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/pr")}
                className="px-8 py-4 rounded-2xl font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                Skip to PR #07 →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom progress dots */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              {["/", "/bug-report", "/commit-log", "/console", "/pr"].map((href, i) => (
                <motion.div
                  key={i}
                  animate={i === 0 ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`rounded-full transition-all duration-300 ${
                    i === 0 ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
