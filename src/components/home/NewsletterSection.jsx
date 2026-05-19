"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Subscribed to newsletter!");
    setEmail("");
  };

  return (
    <section className="bg-[var(--dark-blue)] text-white py-12 md:py-20">
      <motion.div
        className="max-w-2xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "'Feather Bold', sans-serif" }}
        >
          Stay updated on new arrivals
        </h2>
        <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          Get notified about new pets and adoption tips delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input flex-1 sm:flex-auto"
          />
          <button type="submit" className="btn-primary">
            SUBSCRIBE
          </button>
        </form>
      </motion.div>
    </section>
  );
}
