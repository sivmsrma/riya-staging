"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedBg from "../components/AnimatedBg";
import Navbar from "../components/Navbar";
import { Terminal, Send, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: "Available commands: status · feelings.log · why-slow · coffee · riya · sprint · clear · whoami",
  status: "Current state: Deeply fond of Riya. Taking it one sprint at a time. No rush mode: ENABLED.",
  "feelings.log":
    "[INFO]: 8-year legacy cache fully invalidated.\n[INFO]: Fresh memory allocated for Riya.\n[SUCCESS]: Emotional bandwidth: 100% available.",
  "why-slow":
    "Because Riya was 100% right. Meaningful things are compiled with patience. Speed = bugs in relationships.",
  coffee:
    "Dependencies resolved:\n  ✓ High quality brew\n  ✓ Tech banter: enabled\n  ✓ Zero pressure: true\n  ✓ Good vibes: ∞",
  riya: "[MATCH FOUND]: Riya — Smart, honest, grounded, high EQ. Rare find. Handle with care 💕",
  sprint:
    "Sprint 1 Status:\n  [✓] Issue #101: Patched\n  [✓] Commit #001: First Ping\n  [✓] Commit #004: Reality Check\n  [→] Commit #007: In Progress\n  [ ] PR #07: Awaiting Review",
  whoami: "developer@staging — someone who genuinely likes you and is taking it slow 🌸",
};

export default function ConsolePage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: "status", res: COMMANDS.status },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim().toLowerCase();
    if (!query) return;

    if (query === "clear") {
      setHistory([]);
      setInput("");
      setCmdHistory((prev) => [query, ...prev]);
      setCmdIdx(-1);
      return;
    }

    const res = COMMANDS[query] ?? `Command '${query}' not found. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { cmd: input, res }]);
    setCmdHistory((prev) => [query, ...prev]);
    setCmdIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : cmdHistory[nextIdx]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 gap-8">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono text-pink-500/60 tracking-[0.3em] uppercase"
        >
          Interactive Debug Console
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#080810]/95 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-pink-950/30 focus-within:border-pink-500/40 focus-within:shadow-[0_0_40px_rgba(244,114,182,0.12)] ring-1 ring-white/5 transition-all duration-500"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors cursor-pointer" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-md border border-white/5">
              <Terminal className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-xs font-mono text-slate-400">riya-debug-console — bash</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Welcome banner */}
          <div className="px-6 pt-5 pb-2 border-b border-white/5">
            <div className="font-mono text-xs text-slate-600 space-y-1">
              <p className="text-pink-500/50">
                ┌──────────────────────────────────────────────────────┐
              </p>
              <p className="text-pink-500/50">
                │ &nbsp;riya-staging v1.0.0 &nbsp;&nbsp;Type{" "}
                <span className="text-pink-400">help</span> for commands &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│
              </p>
              <p className="text-pink-500/50">
                └──────────────────────────────────────────────────────┘
              </p>
            </div>
          </div>

          {/* History */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="px-6 py-5 font-mono text-sm space-y-5 h-[320px] overflow-y-auto terminal-scroll cursor-text"
          >
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-rose-400 font-bold">riya@staging</span>
                    <span className="text-slate-600">in</span>
                    <span className="text-pink-400 font-bold">~/feelings</span>
                    <span className="text-slate-500">❯</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="text-emerald-400 pl-4 border-l-2 border-emerald-500/20 leading-relaxed py-1 bg-emerald-500/5 rounded-r-lg whitespace-pre-line">
                    {item.res}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endRef} />

            {/* Input row */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-rose-400 font-bold">riya@staging</span>
              <span className="text-slate-600">in</span>
              <span className="text-pink-400 font-bold">~/feelings</span>
              <span className="text-slate-500">❯</span>
              <div className="flex-1 relative flex items-center min-w-[80px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white focus:outline-none font-medium peer caret-pink-500"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
                {!input && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute left-0 w-2.5 h-5 bg-pink-500/70 pointer-events-none"
                  />
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="text-pink-500/50 hover:text-pink-400 transition-colors bg-white/5 p-2 rounded-lg hover:bg-pink-500/10"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Quick commands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {Object.keys(COMMANDS).map((cmd) => (
            <motion.button
              key={cmd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const res = COMMANDS[cmd];
                if (cmd === "clear") {
                  setHistory([]);
                } else {
                  setHistory((prev) => [...prev, { cmd, res }]);
                }
              }}
              className="px-3 py-1.5 rounded-lg font-mono text-xs text-slate-500 bg-white/5 border border-white/5 hover:text-pink-400 hover:border-pink-500/20 hover:bg-pink-500/5 transition-all"
            >
              {cmd}
            </motion.button>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between w-full max-w-3xl"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/commit-log")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Commits
          </motion.button>

          <div className="flex items-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === 3 ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/pr")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-pink-300 bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition-all"
          >
            PR #07 <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
