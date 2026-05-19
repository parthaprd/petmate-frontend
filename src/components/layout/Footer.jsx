"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

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
    <footer className="py-12 bg-transparent transition-colors duration-300">
      <div className="w-[95%] max-w-[1200px] mx-auto bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-color)] rounded-[24px] p-8 md:p-12 shadow-[0_3px_0_var(--border-color)]">
        {/* Top Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (Logo, Description, Newsletter & Socials) */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div>
              <div 
                className="text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Petmate
              </div>
              <p className="text-[14px] font-medium text-[var(--text-muted)] leading-relaxed max-w-md">
                Petmate is a pet adoption platform that helps connect pets with new owners.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[15px] font-bold text-[var(--text-primary)]">
                Stay updated on new arrivals
              </h4>
              <p className="text-[13px] text-[var(--text-muted)] max-w-md">
                Get notified about new pets and adoption tips delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input py-2 px-3 text-[14px] flex-grow"
                />
                <button type="submit" className="btn-primary-small py-2 px-4 h-[48px] flex items-center justify-center">
                  SUBSCRIBE
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--bg-app)] border-[1.5px] border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center text-sm hover:-translate-y-1 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:shadow-[0_2px_0_var(--border-color)] transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--bg-app)] border-[1.5px] border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center text-sm hover:-translate-y-1 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:shadow-[0_2px_0_var(--border-color)] transition-all"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[var(--bg-app)] border-[1.5px] border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center text-sm hover:-translate-y-1 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:shadow-[0_2px_0_var(--border-color)] transition-all"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Right Columns (Links & Info) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 lg:justify-items-end text-left lg:text-right">
            {/* Quick Links Column */}
            <div className="flex flex-col lg:items-end">
              <h3 className="font-semibold text-[14px] uppercase mb-4 text-[var(--text-primary)] tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/all-pets"
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    All Pets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/add-pet"
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    Add Pet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-[14px] font-medium text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col lg:items-end">
              <h3 className="font-semibold text-[14px] uppercase mb-4 text-[var(--text-primary)] tracking-wider">
                Contact
              </h3>
              <ul className="space-y-3 text-[14px] font-medium text-[var(--text-muted)]">
                <li>support@pawshome.com</li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-[var(--border-color)] my-8"></div>

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[var(--text-muted)]">
          <p>© 2026 PawsHome. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[var(--brand-primary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--brand-primary)] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[var(--brand-primary)] transition-colors">
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
