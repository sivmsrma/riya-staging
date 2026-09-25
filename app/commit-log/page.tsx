"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedBg from "../components/AnimatedBg";
import Navbar from "../components/Navbar";
import { GitCommit, ChevronRight, ChevronLeft, GitBranch, Tag } from "lucide-react";

const COMMITS = [
  {
    day: "Day 1",
    id: "001",
    hash: "a3f91c2",
    title: "First Ping",
    desc: "Started as a regular conversation. Didn't expect the vibe to flow this naturally.",
    files: ["conversation.init", "vibes.ts"],
    branch: "feat/new-connection",
  },
  {
    day: "Day 4",
    id: "004",
    hash: "b72e8d1",
    title: "The Reality Check",
    desc: "You called out the speed of things and pointed out the past. You were real, honest, and grounded. Made me respect you 10x more.",
    files: ["honesty.log", "past-baggage.removed", "trust.build"],
    branch: "fix/premature-rush",
  },
  {
    day: "Today",
    id: "007",
    hash: "c19fa4e",
    title: "Refactored Mindset",
    desc: "No 'I love you' rush. Just two people who genuinely like each other, figuring it out sprint by sprint.",
    files: ["patience.config", "expectations.reset", "sprint-1.md"],
    branch: "feat/take-it-slow",
    isLatest: true,
  },
];

export default function CommitLogPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBg />
      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-3xl mx-auto px-6 pt-28 pb-16 flex flex-col gap-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 font-mono text-pink-300 text-lg font-bold"
        >
          <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <GitCommit className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl">Sprint 1 Commit Log</div>
            <div className="text-xs text-slate-500 font-normal mt-0.5">
              3 commits · 2 branches · 1 genuine connection
            </div>
          </div>
        </motion.div>

        {/* Commit list */}
        <div className="relative border-l-2 border-pink-500/20 ml-4 space-y-8 pl-8">
          {/* Glowing gradient line */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-pink-500 via-rose-500/50 to-transparent" />

          {COMMITS.map((commit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover="hover"
              className="relative group cursor-default"
            >
              {/* Timeline dot */}
              <motion.div
                variants={{
                  rest: { scale: 1, boxShadow: "0 0 0px rgba(244,114,182,0)" },
                  hover: { scale: 1.3, boxShadow: "0 0 20px rgba(244,114,182,0.6)" },
                }}
                className={`absolute -left-[41px] top-5 w-4 h-4 rounded-full border-4 border-[#05050a] z-10 transition-colors duration-300 ${
                  commit.isLatest ? "bg-pink-400 group-hover:bg-rose-300" : "bg-pink-600 group-hover:bg-pink-400"
                }`}
              />

              <div className="rounded-2xl border border-white/5 bg-white/5 p-6 group-hover:bg-white/10 group-hover:border-pink-500/30 transition-all duration-400 group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(244,114,182,0.1)]">
                {/* Commit meta */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-400 text-xs font-mono font-bold border border-pink-500/20">
                    commit #{commit.id}
                  </span>
                  <span className="text-xs font-mono text-slate-600">{commit.hash}</span>
                  <span className="text-xs font-mono text-slate-500 ml-auto">{commit.day}</span>
                  {commit.isLatest && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20 flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      HEAD
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 group-hover:text-pink-50 transition-colors">
                  {commit.title}
                  <ChevronRight className="w-4 h-4 text-pink-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h2>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-4">
                  {commit.desc}
                </p>

                {/* Files changed + branch */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <GitBranch className="w-3 h-3" />
                    <span className="font-mono">{commit.branch}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {commit.files.map((f) => (
                      <span
                        key={f}
                        className="flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] bg-white/5 text-slate-500 border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/bug-report")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-slate-400 bg-white/5 border border-white/10 hover:text-slate-200 hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Bug Report
          </motion.button>

          {/* Progress dots */}
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === 2 ? "w-6 h-1.5 bg-pink-500" : "w-1.5 h-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/console")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm text-pink-300 bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition-all"
          >
            Console <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
