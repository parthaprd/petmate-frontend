import Link from 'next/link';
import { FaPaw } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen mt-16 flex items-center justify-center bg-[var(--bg-app)] p-4">
      <div className="text-center">
        <div className="text-[var(--brand-primary)] text-[80px] mb-6 flex justify-center">
          <FaPaw />
        </div>

        <h1
          className="text-5xl md:text-6xl font-bold text-[var(--brand-primary)] mb-4"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          404
        </h1>

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/" className="btn-primary inline-block">
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
