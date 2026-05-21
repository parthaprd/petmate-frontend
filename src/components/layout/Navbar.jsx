"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaBars, FaTimes, FaChevronDown, FaSun, FaMoon, FaPaw } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const hasDarkClass = document.documentElement.classList.contains("dark");
    if (savedTheme === "dark" || (!savedTheme && hasDarkClass)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      setDropdownOpen(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[95%]">
      <nav className="bg-[var(--bg-surface)] rounded-2xl px-6 py-4 flex items-center justify-between md:justify-start md:gap-8 border-[1.5px] border-[var(--border-color)] shadow-[0_3px_0_var(--border-color)] transition-all duration-300">
        {/* Left Side: Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold text-[var(--brand-primary)] ml-2 flex-shrink-0 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          aria-label="Petmate Home"
        >
          <FaPaw className="text-[var(--brand-primary)]" />
          Petmate
        </Link>

        {/* Right Side: Desktop Navigation & Auth */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-[13px] font-bold uppercase tracking-wide transition-colors ${
              isActive("/")
                ? "text-[var(--brand-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/all-pets"
            className={`text-[13px] font-bold uppercase tracking-wide transition-colors ${
              isActive("/all-pets")
                ? "text-[var(--brand-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            All Pets
          </Link>
          {/* Nav links managed in dashboard sidebar */}

          {/* Auth section inline with links */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg border-[1.5px] border-[var(--border-color)] shadow-[0_2px_0_var(--border-color)] hover:bg-[var(--border-color)]/20 text-[var(--text-primary)] transition-all cursor-pointer overflow-hidden"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-48 bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-color)] shadow-[0_3px_0_var(--border-color)] rounded-[16px] z-50 overflow-hidden transition-all">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-[var(--text-primary)] hover:bg-[var(--bg-app)]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-red-500 hover:bg-red-500/10 border-t-[1.5px] border-[var(--border-color)] cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-[13px] font-bold uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                Login
              </Link>
              <Link href="/register" className="btn-primary-small">
                Register
              </Link>
            </div>
          )}

          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--border-color)]/20 text-[var(--text-primary)] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun className="text-amber-500 text-lg" /> : <FaMoon className="text-indigo-500 text-lg" />}
          </button>
        </div>

        {/* Right Corner (Mobile Only): Theme Toggle & Mobile Menu button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--border-color)]/20 text-[var(--text-primary)] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FaSun className="text-amber-500 text-lg" /> : <FaMoon className="text-indigo-500 text-lg" />}
          </button>

          <button
            className="text-[var(--text-primary)] text-xl cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-3 bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-color)] rounded-[24px] p-5 space-y-4 shadow-[0_6px_0_var(--border-color)]">
          <Link
            href="/"
            className={`block px-4 py-2 text-[14px] font-bold uppercase tracking-wide ${
              isActive("/") ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/all-pets"
            className={`block px-4 py-2 text-[14px] font-bold uppercase tracking-wide ${
              isActive("/all-pets") ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            All Pets
          </Link>
          {user && (
            <>
              <Link
                href="/dashboard"
                className={`block px-4 py-2 text-[14px] font-bold uppercase tracking-wide ${
                  pathname === "/dashboard" ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-[14px] font-bold uppercase tracking-wide text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <div className="flex flex-col gap-3 pt-4 border-t-[1.5px] border-[var(--border-color)] mt-2">
              <Link
                href="/login"
                className="block text-center px-4 py-2 text-[14px] font-bold uppercase tracking-wide text-[var(--text-muted)]"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-primary text-center block w-full"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
      </div>
    </>
  );
}
