'use client';
import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/ui/PrivateRoute';
import AdoptionModal from '@/components/pets/AdoptionModal';
import Spinner from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

function PetDetailsContent({ params }) {
  // Next.js 15+/16: params is a Promise — unwrap it with React.use()
  const { id } = use(params);
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/pets/${id}`);
        setPet(res.data);
      } catch (error) {
        toast.error('Failed to load pet details');
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <Spinner />;
  if (!pet) return <div className="text-center py-20">Pet not found</div>;

  const isOwnPet = pet.ownerEmail === user?.email;
  const isAdopted = pet.status === 'adopted';

  return (
    <div className="pt-24 bg-[var(--bg-app)] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Left Side - Pet Pic */}
            <div className="w-full h-[300px] md:h-[600px] relative">
              <img
                src={pet.imageUrl || pet.image}
                alt={pet.name}
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>

            {/* Right Side - Pet Info & Button */}
            <div className="flex flex-col justify-between p-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1
                    className="text-4xl font-bold text-gray-text"
                    style={{ fontFamily: "'Feather Bold', sans-serif" }}
                  >
                    {pet.name}
                  </h1>
                  <span className={`badge ${pet.status === 'available' ? 'badge-available' : 'badge-adopted'}`}>
                    {pet.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="badge-available px-3 py-2 rounded-lg text-center">
                    <div className="text-[10px] font-bold uppercase text-gray-light">Species</div>
                    <div className="text-sm font-bold text-green">{pet.species}</div>
                  </div>
                  <div className="badge-available px-3 py-2 rounded-lg text-center">
                    <div className="text-[10px] font-bold uppercase text-gray-light">Breed</div>
                    <div className="text-sm font-bold text-green">{pet.breed}</div>
                  </div>
                  <div className="badge-available px-3 py-2 rounded-lg text-center">
                    <div className="text-[10px] font-bold uppercase text-gray-light">Age</div>
                    <div className="text-sm font-bold text-green">{pet.age} years</div>
                  </div>
                  <div className="badge-available px-3 py-2 rounded-lg text-center">
                    <div className="text-[10px] font-bold uppercase text-gray-light">Gender</div>
                    <div className="text-sm font-bold text-green">{pet.gender}</div>
                  </div>
                </div>

                {/* Details box */}
                <div className="bg-[var(--bg-app)] border border-[var(--border-color)] rounded-[16px] p-6 space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-gray-light uppercase mb-1">Health Status</h3>
                      <p className="text-sm font-semibold text-gray-text">{pet.healthStatus}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-light uppercase mb-1">Vaccination Status</h3>
                      <p className="text-sm font-semibold text-gray-text">{pet.vaccinationStatus}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-light uppercase mb-1">Location</h3>
                      <p className="text-sm font-semibold text-gray-text">{pet.location}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-light uppercase mb-1">Adoption Fee</h3>
                      <p className="text-sm font-semibold text-green">${pet.adoptionFee}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-color)]">
                    <h3 className="text-xs font-bold text-gray-light uppercase mb-2">About</h3>
                    <p className="text-sm text-gray-light leading-relaxed">{pet.description}</p>
                  </div>
                </div>
              </div>

              {/* Action area */}
              <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                <p className="text-sm text-gray-light mb-3">Listed by: {pet.ownerEmail}</p>
                {isOwnPet ? (
                  <div className="bg-red/10 border-2 border-red rounded-[12px] p-4 text-center">
                    <p className="text-red font-bold">You cannot adopt your own pet.</p>
                  </div>
                ) : isAdopted ? (
                  <div className="bg-gray-light/10 border-2 border-gray-light rounded-[12px] p-4 text-center">
                    <p className="text-gray-light font-bold">This pet has been adopted.</p>
                  </div>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-primary w-full"
                  >
                    START ADOPTION
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AdoptionModal
        pet={pet}
        user={user}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setPet({ ...pet, status: 'adopted' });
        }}
      />
    </div>
  );
}

export default function PetDetailsPage({ params }) {
  return (
    <PrivateRoute>
      <PetDetailsContent params={params} />
    </PrivateRoute>
  );
}
