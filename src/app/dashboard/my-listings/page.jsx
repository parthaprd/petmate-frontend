'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/axios';
import ListingCard from '@/components/dashboard/ListingCard';
import RequestsModal from '@/components/dashboard/RequestsModal';
import UpdatePetModal from '@/components/dashboard/UpdatePetModal';
import DeleteConfirmModal from '@/components/dashboard/DeleteConfirmModal';
import Link from 'next/link';
import Spinner from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export default function MyListingsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsModal, setRequestsModal] = useState({ open: false, petId: null, petName: '' });
  const [updateModal, setUpdateModal] = useState({ open: false, pet: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, petId: null, petName: '' });
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0 });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pets/owner/listings');
      setPets(res.data);
      const available = res.data.filter((p) => p.status === 'available').length;
      const adopted = res.data.filter((p) => p.status === 'adopted').length;
      setStats({
        total: res.data.length,
        available,
        adopted,
      });
    } catch (error) {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleRefetch = () => {
    fetchPets();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1
        className="text-3xl md:text-4xl font-bold text-green mb-8"
        style={{ fontFamily: "'Feather Bold', sans-serif" }}
      >
        My Listings
      </h1>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-light font-bold uppercase mb-1">Total Listings</p>
          <p className="text-3xl font-bold text-blue" style={{ fontFamily: "'Feather Bold', sans-serif" }}>
            {stats.total}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-light font-bold uppercase mb-1">Available</p>
          <p className="text-3xl font-bold text-green" style={{ fontFamily: "'Feather Bold', sans-serif" }}>
            {stats.available}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-sm text-gray-light font-bold uppercase mb-1">Adopted</p>
          <p className="text-3xl font-bold text-orange" style={{ fontFamily: "'Feather Bold', sans-serif" }}>
            {stats.adopted}
          </p>
        </div>
      </div>

      {pets.length === 0 ? (
        <motion.div
          className="card p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-text mb-2">No listings yet</h2>
          <p className="text-gray-light mb-6">
            Add your first pet to start receiving adoption requests.
          </p>
          <Link href="/dashboard/add-pet" className="btn-primary inline-block">
            ADD PET
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {pets.map((pet) => (
              <motion.div
                key={pet._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <ListingCard
                  pet={pet}
                  onRequestsClick={(petId, petName) => {
                    setRequestsModal({ open: true, petId, petName });
                  }}
                  onEditClick={(pet) => {
                    setUpdateModal({ open: true, pet });
                  }}
                  onDeleteClick={(petId, petName) => {
                    setDeleteModal({ open: true, petId, petName });
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <RequestsModal
        isOpen={requestsModal.open}
        onClose={() => setRequestsModal({ open: false, petId: null, petName: '' })}
        petId={requestsModal.petId}
        petName={requestsModal.petName}
        onApproveReject={handleRefetch}
      />

      <UpdatePetModal
        isOpen={updateModal.open}
        onClose={() => setUpdateModal({ open: false, pet: null })}
        pet={updateModal.pet}
        onSuccess={handleRefetch}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, petId: null, petName: '' })}
        petId={deleteModal.petId}
        petName={deleteModal.petName}
        onSuccess={handleRefetch}
      />
    </div>
  );
}
