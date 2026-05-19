"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function UpdatePetModal({ isOpen, onClose, pet, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        image: pet.imageUrl || pet.image,
        healthStatus: pet.healthStatus,
        vaccinationStatus: pet.vaccinationStatus,
        location: pet.location,
        adoptionFee: pet.adoptionFee,
        description: pet.description,
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/pets/${pet._id}`, {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: parseInt(formData.age),
        gender: formData.gender,
        image: formData.image,
        healthStatus: formData.healthStatus,
        vaccinationStatus: formData.vaccinationStatus,
        location: formData.location,
        adoptionFee: parseInt(formData.adoptionFee),
        description: formData.description,
      });

      toast.success("Pet updated successfully!");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to update pet");
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
            className="bg-white rounded-[16px] p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-green"
                style={{ fontFamily: "'Feather Bold', sans-serif" }}
              >
                Update {pet?.name}
              </h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-light hover:text-gray-text"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Species
                  </label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Fish">Fish</option>
                    <option value="Guinea Pig">Guinea Pig</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Gender
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Health Status
                  </label>
                  <select
                    name="healthStatus"
                    value={formData.healthStatus}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Vaccination Status
                  </label>
                  <select
                    name="vaccinationStatus"
                    value={formData.vaccinationStatus}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="Fully Vaccinated">Fully Vaccinated</option>
                    <option value="Partially Vaccinated">
                      Partially Vaccinated
                    </option>
                    <option value="Not Vaccinated">Not Vaccinated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-text mb-2">
                    Adoption Fee
                  </label>
                  <input
                    type="number"
                    name="adoptionFee"
                    value={formData.adoptionFee}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-text mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="input w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "UPDATING..." : "UPDATE PET"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
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
