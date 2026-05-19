'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/axios';
import PetCard from '@/components/pets/PetCard';
import SearchFilter from '@/components/ui/SearchFilter';
import toast from 'react-hot-toast';
import { debounce } from '@/utils/helpers';

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    species: '',
    sort: '',
  });

  const fetchPets = useCallback(
    debounce(async (search, species, sort) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (species) params.append('species', species);
        if (sort) params.append('sort', sort);

        const res = await api.get(`/pets?${params.toString()}`);
        setPets(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        toast.error('Failed to load pets');
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    fetchPets(filters.search, filters.species, filters.sort);
  }, [filters, fetchPets]);

  const handleSearchChange = (search) => {
    setFilters({ ...filters, search });
  };

  const handleSpeciesChange = (species) => {
    setFilters({ ...filters, species });
  };

  const handleSortChange = (sort) => {
    setFilters({ ...filters, sort });
  };

  const handleClearFilters = () => {
    setFilters({ search: '', species: '', sort: '' });
  };

  return (
    <div className="pt-28">
      <SearchFilter
        onSearchChange={handleSearchChange}
        onSpeciesChange={handleSpeciesChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
      />

      <div className="bg-[var(--bg-app)] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-bold text-green mb-2"
              style={{ fontFamily: "'Feather Bold', sans-serif" }}
            >
              All Pets
            </h1>
            <p className="text-[var(--text-muted)] font-medium">
              Showing {totalCount} pet{totalCount !== 1 ? 's' : ''}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="w-full h-[200px] bg-[var(--border-color)]" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-[var(--border-color)] rounded w-1/2" />
                    <div className="h-3 bg-[var(--border-color)] rounded" />
                    <div className="h-3 bg-[var(--border-color)] rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : pets.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                key="pets-grid"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
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
                    <PetCard pet={pet} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">No Pets Found</h2>
              <p className="text-[var(--text-muted)] font-medium">
                Try adjusting your filters or search terms.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
