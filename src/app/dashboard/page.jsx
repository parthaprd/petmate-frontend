'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { FaList, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import Spinner from '@/components/ui/Spinner';
import toast from 'react-hot-toast';

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [listingsRes, requestsRes] = await Promise.all([
          api.get('/pets/owner/listings'),
          api.get('/requests/mine'),
        ]);

        const listings = listingsRes.data;
        const requests = requestsRes.data;
        const available = listings.filter((p) => p.status === 'available').length;

        setStats({
          totalListings: listings.length,
          available,
          myRequests: requests.length,
        });
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  const statCards = [
    {
      icon: FaList,
      label: 'Total Listings',
      value: stats?.totalListings || 0,
      color: 'text-blue',
    },
    {
      icon: FaCheckCircle,
      label: 'Available',
      value: stats?.available || 0,
      color: 'text-green',
    },
    {
      icon: FaEnvelope,
      label: 'My Requests',
      value: stats?.myRequests || 0,
      color: 'text-orange',
    },
  ];

  return (
    <div>
      <h1
        className="text-3xl md:text-4xl font-bold text-green mb-8"
        style={{ fontFamily: "'Feather Bold', sans-serif" }}
      >
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-light text-sm font-bold uppercase mb-2">
                    {stat.label}
                  </p>
                  <h3
                    className={`text-4xl font-bold ${stat.color}`}
                    style={{ fontFamily: "'Feather Bold', sans-serif" }}
                  >
                    {stat.value}
                  </h3>
                </div>
                <Icon className={`text-3xl ${stat.color} opacity-20`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
