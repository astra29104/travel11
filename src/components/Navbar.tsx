
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">TravelQuest</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link to="/destinations" className="text-gray-700 hover:text-primary transition-colors">Destinations</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/bookings" className="text-gray-700 hover:text-primary transition-colors">
                My Bookings
              </Link>
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <span>{user?.name}</span>
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button>Login / Signup</Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t animate-slide-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/destinations" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>Destinations</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
                  My Bookings
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
                  My Profile
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }} 
                  className="text-left text-gray-700 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary transition-colors" onClick={toggleMenu}>
                Login / Signup
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
