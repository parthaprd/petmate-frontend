"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PetCard({ pet }) {
  const statusColor =
    pet.status === "available" ? "badge-available" : "badge-adopted";

  return (
    <motion.div
      className="card p-0 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      
      <div className="w-full h-[220px] bg-gray-100 overflow-hidden relative">
        <img
          src={pet.imageUrl || pet.image}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className={`badge ${statusColor} shadow-sm backdrop-blur-md bg-opacity-90`}>{pet.status}</span>
        </div>
      </div>

      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{pet.name}</h3>
        </div>

        <p className="text-[14px] font-medium text-[var(--text-muted)] mb-3">
          {pet.species} • {pet.breed}
        </p>
        <div className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-muted)] mb-4 mt-auto">
          <FaMapMarkerAlt className="text-[12px] text-[var(--brand-primary)]" />
          {pet.location}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)] mt-auto">
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">
            ${pet.adoptionFee}
          </p>
          <Link href={`/pets/${pet._id}`} className="btn-primary-small">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
