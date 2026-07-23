"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Emphasize from "./Emphasize";
import { home } from "@content/home";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { hero } = home;

  return (
    <section className="relative overflow-hidden bg-navy pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Animated background accents */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container-x relative">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <Emphasize text={hero.headline} />
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {hero.subhead}
          </motion.p>
          <motion.p variants={item} className="mt-4 text-sm font-medium text-white/50">
            {hero.note}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:-translate-y-0.5"
            >
              {hero.primaryCta.label} <span aria-hidden>→</span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/5"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
