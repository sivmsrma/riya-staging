"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import AnimatedBg from "../components/AnimatedBg";
import Navbar from "../components/Navbar";
import {
  GitPullRequest,
  Heart,
  Clock,
  Coffee,
  ChevronLeft,
  CheckCircle2,
  GitMerge,
  User,
  FileText,
  MessageSquare,
} from "lucide-react";

const CHANGES = [
  { file: "relationship.ts", status: "+3 -0", color: "text-emerald-400" },
  { file: "expectations.config", status: "+1 -8", color: "text-emerald-400" },
  { file: "rush-mode.ts", status: "+0 -1", color: "text-rose-400" },
  { file: "patience.module", status: "+∞", color: "text-emerald-400" },
];

export default function PRPage() {
  const router = useRouter();
  const [prStatus, setPrStatus] = useState<"idle" | "approved" | "changes_requested">("idle");

  const triggerConfetti = () => {
    setPrStatus("approved");
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f472b6", "#fb7185", "#fbcfe8", "#fda4af", "#ffffff"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f472b6", "#fb7185", "#fbcfe8", "#fda4af", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 gap-10">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono text-pink-500/60 tracking-[0.3em] uppercase"
        >
          Pull Request // Sprint 1
        </motion.div>

        {/* PR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-2xl group"
        >
          {/* Outer animated border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-pink-500/30 via-rose-400/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm" />

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-1 shadow-2xl shadow-pink-950/30 overflow-hidden">
            <div className="relative bg-[#05050a]/95 backdrop-blur-3xl rounded-[22px] overflow-hidden">

              {/* PR Header bar */}
              <div className="flex items-center gap-3 px-8 pt-8 pb-6 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <GitPullRequest className="w-6 h-6 text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-white">Grab coffee & hang out offline?</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
                      open
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono text-xs mt-1">
                    PR #07 &nbsp;·&nbsp; feat/take-it-slow → main &nbsp;·&nbsp; 4 files changed
                  </p>
                </div>
              </div>

              {/* PR Body */}
              <div className="px-8 py-6 space-y-6">

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-slate-500 text-sm font-mono">Reviewer assigned:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 font-mono text-xs border border-pink-500/20 font-bold">
                    @riya
                  </span>
                </div>

                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-5 text-slate-300 leading-relaxed text-sm">
                    No big commitments, no heavy tags. Just good conversation, your favorite music talks,
                    and some really good coffee. ☕
                    <div className="mt-3 text-slate-500 text-xs font-mono">
                      Closing issue: <span className="text-pink-400">#101</span> (Premature I Love You
                      Exception)
                    </div>
                  </div>
                </div>

                {/* Files changed */}
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 mt-0.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 font-mono text-xs mb-2">Files changed</p>
                    <div className="space-y-1.5">
                      {CHANGES.map((f) => (
                        <div
                          key={f.file}
                          className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 border border-white/5 font-mono text-xs"
                        >
                          <span className="text-slate-400">{f.file}</span>
                          <span className={f.color}>{f.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons / Status */}
                <AnimatePresence mode="wait">
                  {prStatus === "idle" && (
                    <motion.div
                      key="idle"
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col sm:flex-row gap-4 pt-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 15px 40px rgba(244,114,182,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={triggerConfetti}
                        className="relative flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_10px_30px_rgba(244,114,182,0.3)] overflow-hidden flex items-center justify-center gap-2 group/btn"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <Heart className="relative w-5 h-5 group-hover/btn:fill-white transition-all" />
                        <span className="relative flex items-center gap-2">
                          <GitMerge className="w-4 h-4" />
                          Approve & Merge
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setPrStatus("changes_requested")}
                        className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Clock className="w-5 h-5" />
                        Request Changes
                      </motion.button>
                    </motion.div>
                  )}

                  {prStatus === "approved" && (
                    <motion.div
                      key="approved"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="relative p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-center space-y-3 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-5 opacity-[0.07]">
                        <Heart className="w-28 h-28" />
                      </div>
                      <div className="flex items-center justify-center gap-2 font-bold text-xl text-pink-300">
                        <CheckCircle2 className="w-6 h-6" />
                        PR Merged Successfully!
                      </div>
                      <p className="text-slate-300 text-sm md:text-base">
                        Awesome. Pick the place and time whenever you feel ready. ☕✨
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-4 font-mono text-xs text-slate-600">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>Deployment target: real world 🌍</span>
                      </div>
                    </motion.div>
                  )}

                  {prStatus === "changes_requested" && (
                    <motion.div
                      key="changes"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 text-center space-y-3"
                    >
                      <div className="flex items-center justify-center gap-2 font-bold text-xl text-amber-400">
                        <Clock className="w-6 h-6" />
                        Changes Noted
                      </div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        Completely fair! We stick to regular chats and zero pressure. No rush at all. 🌸
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setPrStatus("idle")}
                        className="mt-2 px-4 py-2 rounded-xl font-mono text-xs text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 transition-all"
                      >
                        ↩ Go back
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between w-full max-w-2xl"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/console")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Console
          </motion.button>

          <div className="flex items-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === 4 ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 hover:border-white/20 transition-all"
          >
            ↩ Start over
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
