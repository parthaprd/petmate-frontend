"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const step = target / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(timer);
          setCount(target);
        } else {
          setCount(current);
        }
      }, 40);
      return () => clearInterval(timer);
    }
  }, [target, isInView]);

  return <span ref={ref}>{Math.floor(count).toLocaleString()}</span>;
}

export default function StatsBar() {
  const stats = [
    { label: "Pet Adopted", subtext: "Finding Forever Homes", value: 5000, suffix: "+" },
    { label: "Partner Shelters", subtext: "Supporting Our Mission", value: 500, suffix: "+" },
    { label: "States Covered", subtext: "Across the Nation", value: 50, suffix: "+" },
  ];

  return (
    <div className="bg-[var(--bg-app)] py-20 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card flex items-center justify-start gap-5 p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div
                className="text-4xl md:text-5xl font-extrabold text-[var(--brand-primary)] tracking-tight shrink-0"
              >
                <Counter target={stat.value} />
                {stat.suffix}
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-lg md:text-xl font-bold text-[var(--text-primary)] leading-tight">
                  {stat.label}
                </span>
                <span className="text-xs md:text-sm font-light italic text-[var(--text-muted)] mt-0.5 leading-snug">
                  {stat.subtext}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
