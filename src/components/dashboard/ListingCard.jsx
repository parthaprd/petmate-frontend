"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ListingCard({
  pet,
  onRequestsClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <motion.div
      className="card overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={pet.imageUrl || pet.image}
        alt={pet.name}
        className="w-full h-[150px] object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-text">{pet.name}</h3>
          <span
            className={`badge ${pet.status === "available" ? "badge-available" : "badge-adopted"}`}
          >
            {pet.status}
          </span>
        </div>
        <p className="text-sm text-green font-bold mb-4">
          Fee: ${pet.adoptionFee}
        </p>

        <div className="flex flex-col gap-2">
          {pet.status === "available" && (
            <button
              onClick={() => onRequestsClick(pet._id, pet.name)}
              className="btn-primary-small w-full mb-2"
            >
              REQUESTS
            </button>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditClick(pet)}
              className="btn-secondary-small w-full text-center flex-1"
            >
              EDIT
            </button>
            <Link
              href={`/pets/${pet._id}`}
              className="btn-secondary-small w-full text-center flex-1 block"
            >
              VIEW
            </Link>
            <button
              onClick={() => onDeleteClick(pet._id, pet.name)}
              className="btn-danger-small w-full text-center flex-1"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
