"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import api from "@/lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("paw_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem("paw_user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Called right after Better Auth login succeeds
  // Issues the HTTPOnly JWT cookie from our backend
  const login = async (email, password) => {
    try {
      // Step 1: Better Auth verifies credentials
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message || "Failed to sign in");
      }

      // Step 2: Issue our JWT cookie from the backend
      const response = await api.post("/auth/token", {
        email: data.user.email,
        name: data.user.name,
      });

      // Save user profile and token in localStorage
      const userToStore = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
      };
      setUser(userToStore);
      localStorage.setItem("paw_user", JSON.stringify(userToStore));
      if (response.data.token) {
        localStorage.setItem("paw_token", response.data.token);
      }
      toast.success("Welcome back!");

      // Redirect to saved route or home
      const redirect = localStorage.getItem("redirect_after_login");
      if (redirect) {
        localStorage.removeItem("redirect_after_login");
        router.push(redirect);
      } else {
        router.push("/");
      }

      return data;
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
      throw err;
    }
  };

  const register = async (name, email, password, photoURL) => {
    try {
      // Step 1: Better Auth registers credentials
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL,
      });
      if (error) {
        throw new Error(error.message || "Failed to register");
      }

      // Step 2: Issue our JWT cookie from the backend
      const response = await api.post("/auth/token", {
        email: data.user.email,
        name: data.user.name,
      });

      // Save user profile and token in localStorage
      const userToStore = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
      };
      setUser(userToStore);
      localStorage.setItem("paw_user", JSON.stringify(userToStore));
      if (response.data.token) {
        localStorage.setItem("paw_token", response.data.token);
      }
      toast.success("Account created successfully!");

      // Redirect to saved route or home
      const redirect = localStorage.getItem("redirect_after_login");
      if (redirect) {
        localStorage.removeItem("redirect_after_login");
        router.push(redirect);
      } else {
        router.push("/");
      }

      return data;
    } catch (err) {
      toast.error(err.message || "Registration failed.");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      await authClient.signOut();
    } catch {
      // Even if the request fails, clear local state
    } finally {
      setUser(null);
      localStorage.removeItem("paw_user");
      localStorage.removeItem("paw_token");
      toast.success("See you soon!");
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
