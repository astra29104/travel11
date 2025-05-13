
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  user_id: string;
  name: string;
  email: string;
  age: number;
  location: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { name: string; email: string; password: string; age: number; location: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Check if user is admin (would normally be part of user data from backend)
      const storedAdmin = localStorage.getItem("isAdmin");
      setIsAdmin(storedAdmin === "true");
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This would typically be an API call
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return false;
      }

      // For demo purposes, we'll accept any valid email format and password
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        toast.error("Please enter a valid email");
        return false;
      }

      // Simulating admin login
      const isAdminUser = email.includes("admin");
      if (isAdminUser) {
        const adminUser = {
          user_id: "admin-123",
          name: "Admin User",
          email: email,
          age: 30,
          location: "Admin HQ"
        };
        setUser(adminUser);
        setIsAdmin(true);
        localStorage.setItem("user", JSON.stringify(adminUser));
        localStorage.setItem("isAdmin", "true");
        toast.success("Admin logged in successfully");
        return true;
      }

      // Regular user login
      const mockUser = {
        user_id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email: email,
        age: 25,
        location: "Unknown"
      };
      
      setUser(mockUser);
      setIsAdmin(false);
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAdmin", "false");
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const signup = async (userData: { name: string; email: string; password: string; age: number; location: string }): Promise<boolean> => {
    try {
      // Validate data
      if (!userData.email || !userData.password || !userData.name) {
        toast.error("Please fill in all required fields");
        return false;
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
      if (!isValidEmail) {
        toast.error("Please enter a valid email");
        return false;
      }

      // Create a new user
      const newUser = {
        user_id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        age: userData.age || 25,
        location: userData.location || "Unknown"
      };
      
      setUser(newUser);
      setIsAdmin(false);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isAdmin", "false");
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) {
        toast.error("You must be logged in to update your profile");
        return false;
      }

      const updatedUser = {
        ...user,
        ...userData
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Profile update failed");
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
