'use client';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

export default function AnimatedPaw() {
  return (
    <motion.div
      className="text-8xl mb-6 text-[var(--brand-primary)]"
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <FaPaw />
    </motion.div>
  );
}
