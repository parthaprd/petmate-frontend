"use client";
import { motion } from "framer-motion";
import { FaAppleAlt, FaRunning, FaStethoscope, FaUsers, FaShower } from "react-icons/fa";

export default function PetCareTips() {
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

  return (
    <section className="py-20 bg-[var(--bg-app)] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
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

        <div className="card p-0 grid grid-cols-1 md:grid-cols-5 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-[var(--border-color)] overflow-hidden shadow-[0_4px_0_var(--border-color)] border-[1.5px] border-[var(--border-color)] rounded-2xl bg-[var(--bg-surface)]">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="group relative p-6 flex flex-col items-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[rgba(159,232,112,0.06)] hover:to-transparent"
              >
                {/* Icon wrapper */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border-[1.5px] border-[var(--border-color)] text-[var(--text-muted)] bg-transparent transition-all duration-300 group-hover:bg-[var(--brand-gradient)] group-hover:text-[#163300] group-hover:border-transparent group-hover:shadow-[0_3px_0_var(--brand-dark)]"
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold tracking-tight text-center mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-muted)] font-medium leading-relaxed text-[12px] text-center">
                  {tip.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
