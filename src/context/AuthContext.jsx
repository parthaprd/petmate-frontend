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

  
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem("paw_user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          
          const { data } = await authClient.getSession();
          if (data?.session) {
            const response = await api.post("/auth/token", {
              email: data.user.email,
              name: data.user.name,
            });
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
          }
        }
      } catch (err) {
        localStorage.removeItem("paw_user");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  
  
  const login = async (email, password) => {
    try {
      
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message || "Failed to sign in");
      }

      
      const response = await api.post("/auth/token", {
        email: data.user.email,
        name: data.user.name,
      });

      
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
      
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL,
      });
      if (error) {
        throw new Error(error.message || "Failed to register");
      }

      
      const response = await api.post("/auth/token", {
        email: data.user.email,
        name: data.user.name,
      });

      
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
      
    } finally {
      setUser(null);
      localStorage.removeItem("paw_user");
      localStorage.removeItem("paw_token");
      toast.success("See you soon!");
      router.push("/");
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });
      if (error) {
        throw new Error(error.message || "Failed to sign in with Google");
      }
    } catch (err) {
      toast.error(err.message || "Google login failed.");
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
