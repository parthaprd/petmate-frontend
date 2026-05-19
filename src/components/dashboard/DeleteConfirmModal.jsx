"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  petId,
  petName,
  onSuccess,
}) {
  const handleDelete = async () => {
    try {
      await api.delete(`/pets/${petId}`);
      toast.success("Pet deleted successfully.");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to delete pet");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-[16px] p-8 max-w-md w-full text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FaExclamationTriangle className="w-16 h-16 text-red mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-text mb-2">
              Delete {petName}?
            </h2>
            <p className="text-gray-light text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button onClick={handleDelete} className="btn-danger flex-1">
                DELETE
              </button>
              <button onClick={onClose} className="btn-secondary flex-1">
                CANCEL
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
