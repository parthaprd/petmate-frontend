'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/axios';
import Spinner from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchRequests();
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768));
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/requests/mine');
      setRequests(res.data);
    } catch (error) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this adoption request?')) {
      try {
        await api.delete(`/requests/${requestId}`);
        toast.success('Request cancelled.');
        setRequests(requests.filter((r) => r._id !== requestId));
      } catch (error) {
        toast.error('Failed to cancel request');
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1
        className="text-3xl md:text-4xl font-bold text-green mb-8"
        style={{ fontFamily: "'Feather Bold', sans-serif" }}
      >
        My Adoption Requests
      </h1>

      {requests.length === 0 ? (
        <motion.div
          className="card p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold text-gray-text mb-2">
            No adoption requests yet
          </h2>
          <p className="text-gray-light mb-6">
            Browse available pets and submit your first adoption request.
          </p>
          <Link href="/all-pets" className="btn-primary inline-block">
            BROWSE PETS
          </Link>
        </motion.div>
      ) : isMobile ? (
        
        <AnimatePresence>
          <motion.div
            className="space-y-4"
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
            {requests.map((req) => (
              <motion.div
                key={req._id}
                className="card p-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <h3 className="font-bold text-gray-text mb-2">{req.petName}</h3>
                <div className="space-y-1 text-sm text-gray-light mb-4">
                  <p>Request: {new Date(req.createdAt).toLocaleDateString()}</p>
                  <p>Pickup: {new Date(req.pickupDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`badge ${
                    req.status === 'pending' ? 'badge-pending' :
                    req.status === 'approved' ? 'badge-available' :
                    'badge-rejected'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/pets/${req.petId?._id || req.petId}`}
                    className="btn-ghost-small flex-1 text-center block text-sm"
                  >
                    VIEW
                  </Link>
                  {req.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="btn-danger-small flex-1 text-sm"
                    >
                      CANCEL
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        
        <motion.div
          className="card overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-text uppercase">Pet Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-text uppercase">Request Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-text uppercase">Pickup Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-text uppercase">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-text uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className={index !== requests.length - 1 ? 'border-b border-[var(--border-color)]' : ''}
                >
                  <td className="px-6 py-4 font-semibold text-gray-text">{req.petName}</td>
                  <td className="px-6 py-4 text-gray-light">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-light">
                    {new Date(req.pickupDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${
                      req.status === 'pending' ? 'badge-pending' :
                      req.status === 'approved' ? 'badge-available' :
                      'badge-rejected'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/pets/${req.petId?._id || req.petId}`}
                        className="btn-ghost-small text-xs"
                      >
                        VIEW
                      </Link>
                      {req.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(req._id)}
                          className="btn-danger-small text-xs"
                        >
                          CANCEL
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
