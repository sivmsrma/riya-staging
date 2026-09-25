"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedBg from "../components/AnimatedBg";
import Navbar from "../components/Navbar";
import {
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const FIXES = [
  "Feelings throttled back to human speed.",
  "Zero pressure, zero forced expectations.",
  "Full focus on getting to know each other genuinely.",
];

export default function BugReportPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 gap-10">
        
        {/* Page label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono text-pink-500/60 tracking-[0.3em] uppercase"
        >
          Issue Tracker // Sprint 1
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="group relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-pink-950/20 overflow-hidden hover:border-pink-500/30 transition-colors duration-500"
        >
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
          
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-pink-500/20 transition-colors duration-700" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400"
                >
                  <AlertCircle className="w-6 h-6" />
                </motion.div>
                <div>
                  <h1 className="font-mono text-base md:text-lg text-pink-200 font-bold tracking-wide">
                    ISSUE #101
                  </h1>
                  <p className="text-slate-400 text-sm font-medium">
                    Premature &quot;I Love You&quot; Exception
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold self-start sm:self-auto cursor-default shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                STATUS: PATCHED
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-sm md:text-base font-sans">
              {/* Left */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">
                    REPORTER
                  </p>
                  <div className="flex items-center gap-3 text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-pink-500/20 transition-colors">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30 shrink-0"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="font-medium">Riya</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">
                    ROOT CAUSE (RCA)
                  </p>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/5 hover:border-pink-500/20 transition-colors text-slate-300 leading-relaxed">
                    Developer overwhelmed by how easy and rare it was to talk to you. Ignored core
                    engineering law:
                    <div className="mt-4 p-4 rounded-lg bg-[#0a0a0f] border-l-4 border-l-pink-500 text-pink-300 font-mono text-xs shadow-inner">
                      &gt; &quot;High-value connections require patient compilation, not rushed
                      deployments.&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div>
                <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">
                  HOTFIX DEPLOYED
                </p>
                <ul className="space-y-3">
                  {FIXES.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300"
                    >
                      <ShieldCheck className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Severity badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {["severity: high", "type: emotional", "label: growth", "milestone: sprint-1"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-400/80 font-mono text-xs border border-pink-500/15"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/commit-log")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-pink-300 bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition-all"
          >
            Commit Log <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Progress dots */}
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === 1 ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
