"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Terminal,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Clock,
  Heart,
  GitCommit,
  Coffee,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function StagingPage() {
  const [prStatus, setPrStatus] = useState<"idle" | "approved" | "changes_requested">("idle");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: "status", res: "Sprint 1 in progress. Connection stable. No rush mode enabled." },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = terminalInput.trim().toLowerCase();
    if (!query) return;

    let res = "";
    switch (query) {
      case "help":
        res = "Available commands: status, feelings.log, why-slow, coffee, clear";
        break;
      case "status":
        res = "Current state: Deeply fond of Riya. Taking it one sprint at a time.";
        break;
      case "feelings.log":
        res = "[INFO]: 8-year legacy cache fully invalidated. Fresh memory allocated for Riya.";
        break;
      case "why-slow":
        res = "Because Riya was 100% right. Meaningful things are compiled with patience.";
        break;
      case "coffee":
        res = "Dependencies resolved: High quality brew, tech banter, zero pressure.";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        res = `Command '${query}' not recognized. Try typing 'help'.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: terminalInput, res }]);
    setTerminalInput("");
  };

  const triggerPinkConfetti = () => {
    setPrStatus("approved");
    const colors = ["#f472b6", "#fb7185", "#fbcfe8", "#ffffff"];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0e15] text-slate-200 font-sans selection:bg-pink-500/30 selection:text-pink-300">
      {/* Background Subtle Pink Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 -right-20 w-[400px] h-[400px] bg-rose-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-3xl mx-auto px-5 py-16 flex flex-col gap-14">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-center flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/40 border border-pink-500/20 text-pink-300 text-xs font-mono tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          env: staging // branch: feat/take-it-slow
        </motion.div>

        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-mono"
          >
            Hey Riya, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500">
              You were 100% right.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
          >
            8 saal ka legacy code ek hafte mein rewrite nahi hota. <br />
            Premature release cancel kar di gayi hai—ab sab kuch test-driven, genuine, aur tumhari pace pe chalega.
          </motion.p>
        </section>

        {/* Section 1: The Bug Report */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-pink-500/20 bg-[#131422]/70 backdrop-blur-md p-6 shadow-xl shadow-pink-950/10"
        >
          <div className="flex items-center justify-between border-b border-pink-500/10 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-pink-400" />
              <span className="font-mono text-sm text-pink-300 font-semibold tracking-wide">
                ISSUE #101: Premature &quot;I Love You&quot;
              </span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-300 font-mono">
              Status: Patched
            </span>
          </div>

          <div className="space-y-4 text-sm font-sans text-slate-300">
            <div>
              <p className="text-xs font-mono text-slate-500 mb-1">REPORTER / REVIEWER</p>
              <p className="text-slate-200">Riya (Intern with higher emotional intelligence)</p>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 mb-1">ROOT CAUSE ANALYSIS (RCA)</p>
              <p className="text-slate-300 leading-relaxed">
                Developer overwhelmed by how easy and rare it was to talk to you. Ignored the core engineering law:
                <em className="text-pink-300 not-italic font-mono text-xs block mt-1">
                  &gt; &quot;High-value connections require patient compilation, not rushed deployments.&quot;
                </em>
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 mb-1">HOTFIX DEPLOYED</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Feelings throttled back to human speed.</li>
                <li>Zero pressure, zero forced expectations.</li>
                <li>Full focus on getting to know each other genuinely.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Commit History (Day 1 to Today) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 font-mono text-pink-300 text-sm font-semibold">
            <GitCommit className="w-5 h-5 text-pink-400" />
            <span>Sprint 1 Commit Log</span>
          </div>

          <div className="relative border-l border-pink-500/20 ml-3.5 space-y-7 pl-6">
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-pink-400 ring-4 ring-[#0d0e15]" />
              <p className="text-xs font-mono text-pink-400">commit #001 · Day 1</p>
              <h3 className="text-base font-semibold text-white">First Ping</h3>
              <p className="text-sm text-slate-400 mt-1">
                Started as regular conversation between two devs. Didn&apos;t expect the conversations to flow this naturally.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-pink-400 ring-4 ring-[#0d0e15]" />
              <p className="text-xs font-mono text-pink-400">commit #004 · Day 4</p>
              <h3 className="text-base font-semibold text-white">The Reality Check</h3>
              <p className="text-sm text-slate-400 mt-1">
                You called out the speed of things and pointed out the past. You were real, honest, and grounded. Made me respect you even more.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-pink-400 ring-4 ring-[#0d0e15]" />
              <p className="text-xs font-mono text-pink-400">commit #007 · Today</p>
              <h3 className="text-base font-semibold text-white">Refactored Mindset</h3>
              <p className="text-sm text-slate-400 mt-1">
                No &quot;I love you&quot; rush. Just two people who genuinely like each other, figuring it out sprint by sprint.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Interactive CLI */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-pink-500/20 bg-[#11121d] overflow-hidden shadow-lg"
        >
          {/* Mock Window Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#181926] border-b border-pink-500/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-slate-600" />
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-pink-400" /> riya-debug-console
            </span>
            <div className="w-10" />
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-xs sm:text-sm space-y-3">
            <p className="text-slate-500">// Type &apos;help&apos; to view all available commands</p>
            {terminalHistory.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-pink-400">
                  <span>riya@staging:~$</span>
                  <span className="text-slate-200">{item.cmd}</span>
                </div>
                <div className="text-slate-400 pl-4 border-l border-pink-500/20 leading-relaxed">
                  {item.res}
                </div>
              </div>
            ))}

            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
              <span className="text-pink-400">riya@staging:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type coffee or status..."
                className="flex-1 bg-transparent text-slate-200 focus:outline-none placeholder:text-slate-600 text-xs sm:text-sm"
              />
              <button type="submit" className="text-pink-400 hover:text-pink-300">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.section>

        {/* Section 4: The Final PR Review */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-pink-500/30 bg-gradient-to-b from-[#171424] to-[#12111d] p-6 text-center space-y-6 shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 text-pink-300 font-mono text-sm font-semibold">
            <GitPullRequest className="w-5 h-5 text-pink-400" />
            <span>PR #07: Grab coffee &amp; hang out offline?</span>
          </div>

          <div className="max-w-md mx-auto text-sm text-slate-300 space-y-2">
            <p>
              No big commitments, no heavy tags. Just good conversation, your favorite music talks, and coffee.
            </p>
            <div className="font-mono text-xs text-pink-400 bg-pink-950/30 py-2 px-3 rounded-lg border border-pink-500/10">
              Reviewer required: @riya
            </div>
          </div>

          <AnimatePresence mode="wait">
            {prStatus === "idle" && (
              <motion.div
                key="actions"
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
              >
                <button
                  onClick={triggerPinkConfetti}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve PR (Coffee Date)
                </button>
                <button
                  onClick={() => setPrStatus("changes_requested")}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-sm text-slate-400 bg-slate-800/50 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50 transition cursor-pointer"
                >
                  Request Changes (Even Slower)
                </button>
              </motion.div>
            )}

            {prStatus === "approved" && (
              <motion.div
                key="approved"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 font-mono text-sm space-y-1"
              >
                <div className="flex items-center justify-center gap-2 font-bold">
                  <Coffee className="w-5 h-5 text-pink-400" /> PR Merged into main!
                </div>
                <p className="text-xs text-slate-300">
                  Awesome. Pick the place and time whenever you feel ready. ☕✨
                </p>
              </motion.div>
            )}

            {prStatus === "changes_requested" && (
              <motion.div
                key="changes"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-sm space-y-1"
              >
                <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold">
                  <Clock className="w-5 h-5" /> Changes Noted
                </div>
                <p className="text-xs text-slate-400">
                  Completely fair! We stick to regular chats and zero pressure. Take all the time you need.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Footer */}
        <footer className="text-center font-mono text-xs text-slate-600 pb-8 flex items-center justify-center gap-2">
          <span>built with patience</span>
          <span>·</span>
          <span>zero unmerged baggage</span>
        </footer>

      </main>
    </div>
  );
}
