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
    { label: "Pets Adopted", value: 10000 },
    { label: "Partner Shelters", value: 500 },
    { label: "States Covered", value: 50 },
  ];

  return (
    <div className="bg-[var(--bg-app)] py-20 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div
                className="text-4xl md:text-5xl font-bold text-[var(--brand-primary)] mb-2 tracking-tight"
              >
                <Counter target={stat.value} />
                {stat.label === "Pets Adopted" && "+"}
              </div>
              <div
                className="text-[14px] font-medium text-[var(--text-muted)] tracking-wide"
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
