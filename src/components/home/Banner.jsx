"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative w-full flex items-center justify-center py-20 md:py-28 transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto px-6">

        {/* Center-aligned Content */}
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-6 leading-[1.1] tracking-tight max-w-[850px]"
            variants={itemVariants}
          >
            Effective way <br></br>to adopt a pet.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl font-medium leading-relaxed"
            variants={itemVariants}
          >
            Browse available pets or list your own for adoption.
          </motion.p>

          {/* Centering Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-[400px] sm:max-w-none"
            variants={itemVariants}
          >
            <Link href="/register" className="btn-primary w-full sm:w-auto px-10 flex items-center justify-center">
              Get Started
            </Link>
            <button
              onClick={() => {
                const featured = document.getElementById("featured-section");
                featured?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary w-full sm:w-auto px-10"
            >
              Browse Pets
            </button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
