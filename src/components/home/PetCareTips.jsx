"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAppleAlt, FaRunning, FaStethoscope, FaUsers, FaShower, FaChevronDown } from "react-icons/fa";

export default function PetCareTips() {
  const [openIndex, setOpenIndex] = useState(null);

  const tips = [
    {
      icon: FaAppleAlt,
      title: "Nutrition",
      content:
        "Feed your pet high-quality food appropriate for age and size. Consult with vet about diet schedules.",
    },
    {
      icon: FaRunning,
      title: "Exercise",
      content:
        "Regular exercise is crucial for health. Dogs need daily walks, cats need play. Aim for 30 minutes daily.",
    },
    {
      icon: FaStethoscope,
      title: "Vet Visits",
      content:
        "Schedule regular check-ups with your veterinarian. Keep vaccinations up-to-date and address issues.",
    },
    {
      icon: FaUsers,
      title: "Social",
      content:
        "Expose your pet to different people, animals, and environments. This builds confidence and behavior.",
    },
    {
      icon: FaShower,
      title: "Grooming",
      content:
        "Maintain hygiene with regular baths, brushing, and nail trimming. This prevents skin issues.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[var(--bg-app)] transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          className="mb-14 text-center flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight text-center">
            Pet Care Tips
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] font-medium max-w-2xl text-center">
            Essential care guidance for your new companion
          </p>
        </motion.div>

        <div className="space-y-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-[1.5px] border-[var(--border-color)] rounded-2xl bg-[var(--bg-surface)] overflow-hidden shadow-[0_4px_0_var(--border-color)] transition-all duration-300 hover:bg-gradient-to-r hover:from-[rgba(159,232,112,0.04)] hover:to-transparent"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border-[1.5px] transition-all duration-300 ${
                        isOpen
                          ? "bg-[var(--brand-gradient)] text-[#163300] border-transparent shadow-[0_3px_0_var(--brand-dark)]"
                          : "border-[var(--border-color)] text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] group-hover:border-[var(--brand-primary)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3
                      className={`text-[16px] font-bold tracking-tight transition-colors duration-300 ${
                        isOpen ? "text-[var(--brand-primary)]" : "text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]"
                      }`}
                    >
                      {tip.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`transition-colors duration-300 ${isOpen ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}`}
                  >
                    <FaChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 pl-[72px] text-[var(--text-muted)] font-medium leading-relaxed text-[14px]">
                        {tip.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
