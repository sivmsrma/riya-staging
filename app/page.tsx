"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Terminal,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Clock,
  GitCommit,
  Coffee,
  Send,
  Heart,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function StagingPage() {
  const [prStatus, setPrStatus] = useState<"idle" | "approved" | "changes_requested">("idle");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    { cmd: "status", res: "Sprint 1 in progress. Connection stable. No rush mode enabled." },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

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
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f472b6", "#fb7185", "#fbcfe8", "#ffffff"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f472b6", "#fb7185", "#fbcfe8", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-200 font-sans selection:bg-pink-500/30 selection:text-pink-300 overflow-x-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-pink-600/20 blur-[150px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-rose-500/20 blur-[150px] rounded-full mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col gap-24">
        
        {/* Floating Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-500 shadow-[0_0_20px_rgba(244,114,182,0.1)] hover:shadow-[0_0_30px_rgba(244,114,182,0.3)] cursor-default">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
            <span className="relative text-pink-200 text-xs font-mono font-medium tracking-wider">
              ENV: STAGING // BRANCH: FEAT/TAKE-IT-SLOW
            </span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans"
          >
            Hey Riya, <br />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-xl opacity-50"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-pink-500 drop-shadow-sm">
                You were 100% right.
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            8 saal ka legacy code ek hafte mein rewrite nahi hota. <br />
            <span className="text-slate-300 font-medium">Premature release cancel kar di gayi hai</span>—ab sab kuch test-driven, genuine, aur tumhari pace pe chalega.
          </motion.p>
        </section>

        {/* Section 1: The Bug Report (Glassmorphism + Hover 3D feel) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl overflow-hidden hover:border-pink-500/30 transition-colors duration-500"
        >
          {/* Subtle hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-mono text-base md:text-lg text-pink-200 font-bold tracking-wide flex items-center gap-2">
                    ISSUE #101
                  </h2>
                  <p className="text-slate-400 text-sm font-medium">Premature &quot;I Love You&quot; Exception</p>
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
              <div className="space-y-6">
                <div className="group/item">
                  <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">REPORTER</p>
                  <div className="flex items-center gap-3 text-slate-200 bg-white/5 p-4 rounded-xl border border-white/5 group-hover/item:border-pink-500/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span>Riya <span className="text-slate-400 text-xs ml-1">(Intern with higher EQ)</span></span>
                  </div>
                </div>
                <div className="group/item">
                  <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">ROOT CAUSE (RCA)</p>
                  <div className="bg-white/5 p-5 rounded-xl border border-white/5 group-hover/item:border-pink-500/20 transition-colors text-slate-300 leading-relaxed">
                    Developer overwhelmed by how easy and rare it was to talk to you. Ignored core engineering law:
                    <div className="mt-4 p-4 rounded-lg bg-[#0a0a0f] border border-pink-500/10 text-pink-300 font-mono text-xs md:text-sm border-l-4 border-l-pink-500 shadow-inner">
                      &gt; &quot;High-value connections require patient compilation, not rushed deployments.&quot;
                    </div>
                  </div>
                </div>
              </div>

              <div className="group/item">
                <p className="text-xs font-mono text-pink-500/70 mb-2 tracking-wider font-semibold">HOTFIX DEPLOYED</p>
                <ul className="space-y-3">
                  {[
                    "Feelings throttled back to human speed.",
                    "Zero pressure, zero forced expectations.",
                    "Full focus on getting to know each other genuinely."
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-300"
                    >
                      <ShieldCheck className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Commit History (Interactive Timeline) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="flex items-center gap-3 font-mono text-pink-300 text-lg font-bold mb-10 pl-2">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
              <GitCommit className="w-6 h-6" />
            </div>
            <span className="tracking-wide">Sprint 1 Commit Log</span>
          </div>

          <div className="relative border-l-2 border-pink-500/20 ml-6 space-y-12 pl-10">
            {/* Glowing line overlay */}
            <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-pink-500 via-rose-500 to-transparent opacity-50" />

            {[
              { day: "Day 1", id: "001", title: "First Ping", desc: "Started as a regular conversation. Didn't expect the vibe to flow this naturally." },
              { day: "Day 4", id: "004", title: "The Reality Check", desc: "You called out the speed of things and pointed out the past. You were real, honest, and grounded. Made me respect you 10x more." },
              { day: "Today", id: "007", title: "Refactored Mindset", desc: "No 'I love you' rush. Just two people who genuinely like each other, figuring it out sprint by sprint." }
            ].map((commit, i) => (
              <motion.div 
                key={i}
                initial="initial"
                whileHover="hover"
                className="relative group cursor-default"
              >
                {/* Custom Timeline Dot */}
                <motion.div 
                  variants={{
                    initial: { scale: 1, boxShadow: "0 0 0 rgba(244,114,182,0)" },
                    hover: { scale: 1.2, boxShadow: "0 0 20px rgba(244,114,182,0.6)" }
                  }}
                  className="absolute -left-[49px] top-1.5 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#05050a] z-10 transition-colors duration-300 group-hover:bg-rose-400" 
                />
                
                <div className="flex flex-col bg-white/5 border border-white/5 p-6 rounded-2xl group-hover:bg-white/10 group-hover:border-pink-500/30 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(244,114,182,0.1)]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-400 text-xs font-mono font-bold border border-pink-500/20">
                      commit #{commit.id}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{commit.day}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    {commit.title}
                    <ChevronRight className="w-4 h-4 text-pink-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {commit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Interactive CLI (Ultra Modern) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl overflow-hidden shadow-2xl hover:border-pink-500/30 transition-all duration-500 focus-within:border-pink-500/50 focus-within:shadow-[0_0_30px_rgba(244,114,182,0.15)] ring-1 ring-white/5"
        >
          {/* Mock Window Top Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors cursor-pointer" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer" />
            </div>
            <div className="flex px-3 py-1 bg-black/40 rounded-md border border-white/5">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-pink-400" /> riya-debug-console
              </span>
            </div>
            <div className="w-14" />
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm md:text-base space-y-4 h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-pink-500/50">❯</span>
              <p>Welcome to Staging v1.0.0. Type <span className="text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">help</span> to view available commands.</p>
            </div>
            
            <AnimatePresence>
              {terminalHistory.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index} 
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-rose-400 font-bold">riya@staging</span>
                    <span className="text-slate-500">in</span>
                    <span className="text-pink-400 font-bold">~</span>
                    <span className="text-slate-400">❯</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="text-emerald-400 pl-4 border-l-2 border-emerald-500/20 leading-relaxed py-1 bg-emerald-500/5 rounded-r-lg">
                    {item.res}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={terminalEndRef} />

            <form onSubmit={handleCommand} className="flex items-center gap-2.5 pt-2">
              <span className="text-rose-400 font-bold">riya@staging</span>
              <span className="text-slate-500">in</span>
              <span className="text-pink-400 font-bold">~</span>
              <span className="text-slate-400">❯</span>
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="w-full bg-transparent text-white focus:outline-none font-medium peer"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
                {/* Custom glowing cursor effect */}
                {!terminalInput && (
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute left-0 w-2.5 h-5 bg-pink-500/80 mix-blend-screen pointer-events-none"
                  />
                )}
              </div>
              <button type="submit" className="text-pink-500/50 hover:text-pink-400 transition-colors bg-white/5 p-2 rounded-lg hover:bg-pink-500/10">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.section>

        {/* Section 4: The Final PR Review (Premium Card) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 shadow-2xl overflow-hidden group"
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
          
          <div className="relative bg-[#05050a]/95 backdrop-blur-3xl rounded-[23px] p-8 md:p-12 text-center flex flex-col items-center gap-8 border border-white/5">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 font-mono text-sm font-bold shadow-[0_0_20px_rgba(244,114,182,0.15)]">
              <GitPullRequest className="w-5 h-5" />
              <span>PR #07: Hangout Request</span>
            </div>

            <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Grab coffee &amp; hang out offline?</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                No big commitments, no heavy tags. Just good conversation, your favorite music talks, and some really good coffee.
              </p>
              <div className="inline-block mt-4 font-mono text-sm text-pink-400 bg-pink-950/40 py-2.5 px-5 rounded-xl border border-pink-500/20">
                Reviewer assigned: <span className="text-white font-bold">@riya</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {prStatus === "idle" && (
                <motion.div
                  key="actions"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col sm:flex-row w-full max-w-md gap-4 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={triggerPinkConfetti}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_10px_30px_rgba(244,114,182,0.3)] hover:shadow-[0_10px_40px_rgba(244,114,182,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <Heart className="w-5 h-5 group-hover/btn:fill-white transition-all" />
                    Approve PR
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPrStatus("changes_requested")}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-base text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
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
                  className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/30 text-center space-y-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Heart className="w-24 h-24" />
                  </div>
                  <div className="flex items-center justify-center gap-2 font-bold text-xl text-pink-300 mb-2">
                    <Coffee className="w-6 h-6" /> PR Merged Successfully!
                  </div>
                  <p className="text-slate-300 text-sm md:text-base">
                    Awesome. Pick the place and time whenever you feel ready. ☕✨
                  </p>
                </motion.div>
              )}

              {prStatus === "changes_requested" && (
                <motion.div
                  key="changes"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 text-center space-y-3"
                >
                  <div className="flex items-center justify-center gap-2 font-bold text-xl text-yellow-400 mb-2">
                    <ShieldCheck className="w-6 h-6" /> Changes Noted
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    Completely fair! We stick to regular chats and zero pressure. No rush at all.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center font-mono text-sm text-slate-600 pb-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-8 opacity-60 hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5"><Code className="w-4 h-4" /> built with patience</span>
          <span className="hidden sm:inline text-pink-500/30">•</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> zero unmerged baggage</span>
        </footer>

      </main>
    </div>
  );
}
