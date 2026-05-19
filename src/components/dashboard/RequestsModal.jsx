"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function RequestsModal({
  isOpen,
  onClose,
  petId,
  petName,
  onApproveReject,
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && petId) {
      fetchRequests();
    }
  }, [isOpen, petId]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/requests/pet/${petId}`);
      setRequests(res.data);
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await api.patch(`/requests/${requestId}`, { status: "approved" });
      toast.success("Request approved! Pet marked as adopted.");
      fetchRequests();
      onApproveReject?.();
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await api.patch(`/requests/${requestId}`, { status: "rejected" });
      toast.success("Request rejected.");
      fetchRequests();
      onApproveReject?.();
    } catch (error) {
      toast.error("Failed to reject request");
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
                Adoption Requests for {petName}
              </h2>
              <button
                onClick={onClose}
                className="text-2xl text-gray-light hover:text-gray-text"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading requests...</div>
            ) : requests.length === 0 ? (
              <div className="text-center py-8 text-gray-light">
                No requests yet for this pet
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="card p-4 border-l-4 border-green"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-light uppercase font-bold mb-1">
                          Requester
                        </p>
                        <p className="font-bold text-gray-text">
                          {req.userName}
                        </p>
                        <p className="text-sm text-gray-light">
                          {req.userEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-light uppercase font-bold mb-1">
                          Pickup Date
                        </p>
                        <p className="font-bold text-gray-text">
                          {new Date(req.pickupDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b border-[var(--border-color)]">
                      <p className="text-xs text-gray-light uppercase font-bold mb-1">
                        Message
                      </p>
                      <p className="text-sm text-gray-light">{req.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`badge ${
                          req.status === "pending"
                            ? "badge-pending"
                            : req.status === "approved"
                              ? "badge-available"
                              : "badge-rejected"
                        }`}
                      >
                        {req.status}
                      </span>

                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(req._id)}
                            className="btn-primary-small"
                          >
                            APPROVE
                          </button>
                          <button
                            onClick={() => handleReject(req._id)}
                            className="btn-danger-small"
                          >
                            REJECT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
