"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AdoptionModal({
  pet,
  user,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    petName: pet?.name || "",
    userName: user?.name || "",
    userEmail: user?.email || "",
    pickupDate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/requests", {
        petId: pet._id,
        petName: formData.petName,
        userName: formData.userName,
        userEmail: formData.userEmail,
        pickupDate: formData.pickupDate,
        message: formData.message,
      });
      toast.success("Adoption request submitted!");
      onSuccess();
      onClose();
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("You already have a pending request for this pet");
      } else if (error.response?.status === 403) {
        toast.error("You cannot adopt your own pet");
      } else if (error.response?.status === 400) {
        toast.error("This pet is already adopted");
      } else {
        toast.error("Failed to submit adoption request");
      }
    } finally {
      setLoading(false);
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
            className="bg-white rounded-[16px] p-6 md:p-8 max-w-md w-full card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-2xl font-bold text-green mb-6"
              style={{ fontFamily: "'Feather Bold', sans-serif" }}
            >
              Adopt {pet?.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  readOnly
                  className="input bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  readOnly
                  className="input bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  readOnly
                  className="input bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us why you'd be a great owner..."
                  rows="4"
                  className="input"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? "SUBMITTING..." : "ADOPT"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
