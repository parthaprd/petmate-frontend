'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/ui/PrivateRoute';
import { FaHome, FaPlus, FaList, FaInbox } from 'react-icons/fa';
import toast from 'react-hot-toast';

function DashboardLayoutContent({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { icon: FaHome, label: 'Overview', shortLabel: 'Overview', path: '/dashboard' },
    { icon: FaPlus, label: 'Add Pet', shortLabel: 'Add Pet', path: '/dashboard/add-pet' },
    { icon: FaList, label: 'My Listings', shortLabel: 'Listings', path: '/dashboard/my-listings' },
    { icon: FaInbox, label: 'My Requests', shortLabel: 'Requests', path: '/dashboard/my-requests' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="flex min-h-screen pt-28 bg-[var(--bg-app)]">
      
      <aside className="hidden md:block fixed z-40 left-6 top-28 bottom-6 w-60 bg-[var(--bg-surface)] text-[var(--text-primary)] border-[1.5px] border-[var(--border-color)] shadow-[0_3px_0_var(--border-color)] rounded-2xl p-6 transition-all duration-300">
        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[var(--bg-surface)] border-[var(--brand-primary)] text-[var(--brand-primary)] shadow-[0_3px_0_var(--brand-primary)] -translate-y-[2px] active:translate-y-[1px] active:shadow-none font-bold'
                    : 'bg-transparent border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:border-[var(--border-color)] hover:text-[var(--text-primary)] hover:shadow-[0_3px_0_var(--border-color)] hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-none'
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-t border-[var(--border-color)] pt-4">
            {user?.image ? (
              <div className="w-10 h-10 rounded-xl border-[1.5px] border-[var(--border-color)] shadow-[0_2px_0_var(--border-color)] overflow-hidden flex-shrink-0">
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold border-[1.5px] border-[var(--border-color)] shadow-[0_2px_0_var(--border-color)] flex-shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-[var(--text-primary)]">{user?.name}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn-danger w-full text-sm"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      
      <main className="flex-1 md:pl-72 overflow-auto">
        
        <div className="p-4 md:p-8 pb-28 md:pb-8">
          {children}
        </div>
      </main>

      
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px] bg-[var(--bg-surface)] border-[1.5px] border-[var(--border-color)] shadow-[0_4px_0_var(--border-color)] rounded-2xl py-3 px-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all ${
                active
                  ? 'text-[var(--brand-primary)] scale-105 font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-[10px] font-bold uppercase tracking-wide">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </PrivateRoute>
  );
}
