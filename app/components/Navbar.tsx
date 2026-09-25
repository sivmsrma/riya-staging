"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, GitCommit, AlertCircle, GitPullRequest, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "Init", icon: Home },
  { href: "/bug-report", label: "Issue #101", icon: AlertCircle },
  { href: "/commit-log", label: "Commits", icon: GitCommit },
  { href: "/console", label: "Console", icon: Terminal },
  { href: "/pr", label: "PR #07", icon: GitPullRequest },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-pink-950/20">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 mr-2 border-r border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
          </span>
          <span className="text-[10px] font-mono text-pink-400/80 tracking-widest hidden sm:block">STAGING</span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-300 ${
                  isActive
                    ? "text-pink-300 bg-pink-500/15 border border-pink-500/30"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:block">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-pink-500/10 border border-pink-500/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
