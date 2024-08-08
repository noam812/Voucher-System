import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserProfile, logout } from "../services/api";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: any;
  login: (user: any) => void;
  logout: () => void;
  updateUser: (updatedUser: any) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
      const checkAuth = async () => {
        if (!isLoggedIn || !user) {
          return;
        }
      const token = await SecureStore.getItemAsync("token");
      if (token) {
          try {
          const userProfile = await getUserProfile(user._id);
          setUser(userProfile);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          await SecureStore.deleteItemAsync("token");
        }
      }
    };

    checkAuth();
  }, []);

  const login = (user: any) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateUser = (updatedUser: any) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout: logoutUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
