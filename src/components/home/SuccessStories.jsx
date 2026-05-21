"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function SuccessStories() {
  const stories = [
    {
      name: "Sarah Johnson",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      quote:
        "Adopting Max from PawsHome changed our lives. He brought so much joy and love to our family!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      quote:
        "Luna is the perfect companion. The adoption process was smooth, and the team was so helpful.",
      rating: 5,
    },
    {
      name: "Emma Williams",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      quote:
        "Best decision ever! Bella has stolen our hearts completely. Thank you PawsHome!",
      rating: 5,
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
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] font-medium max-w-2xl text-center">
            Happy tails from our adopters
          </p>
        </motion.div>

        <div className="card p-0 grid grid-cols-1 md:grid-cols-3 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-[var(--border-color)] overflow-hidden shadow-[0_4px_0_var(--border-color)] border-[1.5px] border-[var(--border-color)] rounded-2xl bg-[var(--bg-surface)]">
          {stories.map((story, index) => {
            return (
              <div
                key={index}
                className="group relative p-8 flex flex-col items-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[rgba(159,232,112,0.06)] hover:to-transparent"
              >
                
                <div className="relative mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-14 h-14 rounded-xl object-cover border-[1.5px] border-[var(--border-color)] transition-all duration-300 group-hover:border-[var(--brand-primary)] group-hover:shadow-[0_3px_0_var(--brand-dark)]"
                  />
                </div>

                
                <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                  {story.name}
                </h3>

                
                <div className="flex gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#fbbf24] text-xs" />
                  ))}
                </div>

                
                <p className="text-[var(--text-muted)] font-medium italic leading-relaxed text-[13px] max-w-xs text-center">
                  "{story.quote}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
