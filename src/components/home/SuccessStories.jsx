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

        <div className="flex justify-center">
          <div className="group relative p-10 flex flex-col items-center transition-all duration-300 hover:bg-gradient-to-b hover:from-[rgba(159,232,112,0.06)] hover:to-transparent bg-[var(--bg-surface)] rounded-3xl max-w-2xl w-full">
            <div className="relative mb-6">
              <img
                src={stories[0].image}
                alt={stories[0].name}
                className="w-20 h-20 rounded-2xl object-cover transition-all duration-300 group-hover:shadow-[0_4px_0_var(--brand-dark)]"
              />
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
              {stories[0].name}
            </h3>

            <div className="flex gap-1.5 mb-6">
              {[...Array(stories[0].rating)].map((_, i) => (
                <FaStar key={i} className="text-[#fbbf24] text-sm" />
              ))}
            </div>

            <p className="text-[var(--text-muted)] font-medium italic leading-relaxed text-[15px] max-w-lg text-center">
              "{stories[0].quote}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
