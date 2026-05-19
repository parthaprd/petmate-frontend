"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [session, isPending]);

  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message || "Failed to sign in");
    }
    return data;
  };

  const register = async (name, email, password, photoURL) => {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL,
    });
    if (error) {
      throw new Error(error.message || "Failed to register");
    }
    return data;
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
