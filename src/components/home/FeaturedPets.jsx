"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import PetCard from "@/components/pets/PetCard";
import toast from "react-hot-toast";

export default function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/pets/featured");
        setPets(res.data);
      } catch (error) {
        toast.error("Failed to load featured pets");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section id="featured-section" className="py-20 bg-[var(--bg-app)] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="mb-14 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight text-center"
          >
            Featured Pets
          </h2>
          <p className="text-lg text-[var(--text-muted)] font-medium max-w-2xl text-center">
            Meet the pets currently available for adoption.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse p-0 overflow-hidden">
                <div className="w-full h-[200px] bg-[var(--border-color)]" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-[var(--border-color)] rounded w-1/2" />
                  <div className="h-4 bg-[var(--border-color)] rounded" />
                  <div className="h-4 bg-[var(--border-color)] rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {pets.map((pet) => (
              <motion.div
                key={pet._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <Link href="/all-pets" className="btn-secondary">
            View All Pets
          </Link>
        </div>
      </div>
    </section>
  );
}
