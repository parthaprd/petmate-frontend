'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle, user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/');
    return null;
  }

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 6) errors.push('At least 6 characters');
    if (!/[A-Z]/.test(pwd)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(pwd)) errors.push('At least one lowercase letter');
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const pwd_errors = validatePassword(value);
      setErrors({ ...errors, password: pwd_errors });
    }

    if (name === 'confirmPassword' && formData.password !== value) {
      setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
    } else if (name === 'confirmPassword') {
      const newErrors = { ...errors };
      delete newErrors.confirmPassword;
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (errors.password?.length > 0) {
      toast.error('Password does not meet requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.photoURL);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green/5 to-blue/5 flex items-center justify-center p-4 pt-28 pb-12">
      <div className="card w-full max-w-md p-8">
        <h1
          className="text-3xl font-bold text-green text-center mb-8"
          style={{ fontFamily: "'Feather Bold', sans-serif" }}
        >
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">Profile Photo URL (Optional)</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">Password</label>
            <div className="relative mb-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-light"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password?.length > 0 && (
              <ul className="text-xs text-red ml-2 space-y-1">
                {errors.password.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-text mb-2">Confirm Password</label>
            <div className="relative mb-2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-light"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red ml-2">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border-color)]" />
          <span className="text-sm text-gray-light">OR</span>
          <div className="flex-1 h-px bg-[var(--border-color)]" />
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="btn-secondary w-full flex items-center justify-center gap-2"
        >
          <FaGoogle /> CONTINUE WITH GOOGLE
        </button>

        <p className="text-center text-sm text-gray-light mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-green hover:text-green-hover">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
