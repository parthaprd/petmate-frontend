"use client";
import { motion } from "framer-motion";
import { FaHeart, FaSmile, FaHeartbeat } from "react-icons/fa";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: FaHeart,
      title: "Save a Life",
      description:
        "Give a pet a second chance with a new home."
    },
    {
      icon: FaSmile,
      title: "Unconditional Love",
      description:
        "Pets provide daily companionship and loyalty."
    },
    {
      icon: FaHeartbeat,
      title: "Good for Health",
      description:
        "Owning a pet has proven benefits for reducing stress and improving mental wellbeing."
    },
  ];

  return (
    <section className="relative bg-[var(--bg-surface)] text-[var(--text-primary)] py-20 transition-colors duration-300">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Why Adopt?
          </h2>
          <p className="text-lg text-[var(--text-muted)] font-medium max-w-2xl mx-auto">
            Adopting a pet changes their world, and yours.
          </p>
        </motion.div>

        <div className="card p-0 grid grid-cols-1 md:grid-cols-3 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-[var(--border-color)] overflow-hidden shadow-[0_4px_0_var(--border-color)] border-[1.5px] border-[var(--border-color)] rounded-2xl bg-[var(--bg-surface)]">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group relative p-8 flex flex-col items-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[rgba(159,232,112,0.06)] hover:to-transparent"
              >
                {/* Icon wrapper */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border-[1.5px] border-[var(--border-color)] text-[var(--text-muted)] bg-transparent transition-all duration-300 group-hover:bg-[var(--brand-gradient)] group-hover:text-[#163300] group-hover:border-transparent group-hover:shadow-[0_3px_0_var(--brand-dark)]"
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-muted)] font-medium leading-relaxed text-[13px] max-w-xs text-center">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
