"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddPetForm() {
  const { user } = useAuth();
  const router = useRouter();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (
      !formData.name ||
      !formData.species ||
      !formData.breed ||
      !formData.age ||
      !formData.gender ||
      !formData.image ||
      !formData.healthStatus ||
      !formData.vaccinationStatus ||
      !formData.location ||
      !formData.adoptionFee ||
      !formData.description
    ) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/pets", {
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

      toast.success("Pet listed successfully!");
      router.push("/dashboard/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1
        className="text-3xl md:text-4xl font-bold text-green mb-8"
        style={{ fontFamily: "'Feather Bold', sans-serif" }}
      >
        Add a Pet
      </h1>

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Pet Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Max"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Species *
            </label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Fish">Fish</option>
              <option value="Guinea Pig">Guinea Pig</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Breed *
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="e.g., Golden Retriever"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Age (years) *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Gender *
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
              Image URL *
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/pet.jpg"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Health Status *
            </label>
            <select
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Vaccination Status *
            </label>
            <select
              name="vaccinationStatus"
              value={formData.vaccinationStatus}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Select Status</option>
              <option value="Fully Vaccinated">Fully Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">
              Adoption Fee ($) *
            </label>
            <input
              type="number"
              name="adoptionFee"
              value={formData.adoptionFee}
              onChange={handleChange}
              min="0"
              className="input w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-text mb-2">
            Owner Email (Auto-filled) *
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input w-full bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-text mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about this pet..."
            rows="5"
            className="input w-full"
          />
        </div>

        <div className="flex gap-3 pt-6">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "ADDING..." : "ADD PET"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
