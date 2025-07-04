import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  ShoppingCart, Search, Menu, X, UserCog, Heart, Package, History,
  LocationEdit, ShoppingCartIcon, LogOut, LogIn, ChevronDown
} from 'lucide-react';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  // Dummy data to simulate user state (replace with context/props/custom logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", {
          withCredentials: true, // Important for cookie handling
        });
  
        const data = res.data;
        if (data.success) { 
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  

  useEffect(() => {
    if (isUserMenuOpen) {
      calculateMenuPosition();
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', calculateMenuPosition);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', calculateMenuPosition);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  const calculateMenuPosition = () => {
    if (userMenuRef.current) {
      const rect = userMenuRef.current.getBoundingClientRect();
      const menuWidth = 224;
      const menuHeight = 320;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = rect.bottom + 8;
      let left = rect.right - menuWidth;

      if (top + menuHeight > vh) top = rect.top - menuHeight - 8;
      if (left < 16) left = 16;
      if (left + menuWidth > vw - 16) left = vw - menuWidth - 16;

      setMenuPosition({ top, left });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/users/logout", {
        method: "GET",
        credentials: "include",
      });
  
      message.success("Logged out successfully");
      setIsUserMenuOpen(false);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      message.error("Logout failed");
      console.error(err);
    }
  };
  

  const getUserAvatar = (name) => {
    let initials = '??';
    if (name && typeof name === 'string') {
      initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'];
    const colorIndex = name && typeof name === 'string' ? name.length % colors.length : 0;

    return (
      <div className={`w-8 h-8 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-bold`}>
        {initials}
      </div>
    );
  };

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'Product', to: '/products' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const userMenuItems = [
    { name: 'Profile Edit', icon: UserCog, to: '/ProfileEditFormUser' },
    { name: 'Address Manage', icon: LocationEdit, to: '/AddressManager' },
    { name: 'Wish List', icon: Heart, to: '/wishlist' },
    { name: 'My Cart', icon: ShoppingCartIcon, to: '/cart' },
    { name: 'My Orders', icon: Package, to: '/MyOrdersUser' },
    { name: 'History', icon: History, to: '/OrderHistoryUser' },
  ];

  const handleMenuClick = (to) => {
    setIsUserMenuOpen(false);
    navigate(to);
  };

  const ProfileMenu = () => {
    if (!isUserMenuOpen || typeof window === 'undefined') return null;

    return createPortal(
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bg-white shadow-2xl rounded-lg border border-gray-200 w-56 z-[9999]"
        style={{ top: menuPosition.top, left: menuPosition.left }}
      >
        <div className="p-2">
          <div className="px-3 py-2 border-b mb-2">
            <div className="flex items-center gap-3">
              {getUserAvatar(user.fullname)}
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate max-w-[160px]" title={user.email}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {userMenuItems.map(({ name, icon: Icon, to }) => (
              <button key={name} onClick={() => handleMenuClick(to)}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md w-full">
                <Icon className="w-4 h-4" /> {name}
              </button>
            ))}
          </div>

          <div className="border-t mt-2 pt-2">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 w-full">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </motion.div>,
      document.body
    );
  };

  if (loading) {
    return null; // or you can return a spinner component here
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-3xl font-bold text-blue-700">
          My<span className="text-gray-800">Store</span>
        </button>

        <div className="hidden lg:flex items-center mx-8">
          <div className="relative">
            <input type="text" placeholder="Search..." className="border rounded-full pl-10 pr-4 py-2 w-56 text-sm focus:ring-2 focus:ring-blue-500" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-5">
          {menuItems.map((item) => (
            <motion.button key={item.name} onClick={() => navigate(item.to)}
              className={`font-medium ${location.pathname === item.to ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
              whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
              {item.name}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-4">
            <motion.button onClick={() => navigate('/wishlist')} className="p-2 text-gray-600 hover:text-blue-600 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full px-1 text-xs">2</span>
            </motion.button>

            <motion.button onClick={() => navigate('/cart')} className="p-2 text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full px-1 text-xs">2</span>
            </motion.button>
          </div>

          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <motion.button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-blue-600 rounded-lg">
                {getUserAvatar(user.fullname)}
                <span className="hidden sm:block font-medium text-black">{user.fullname}</span>
                <ChevronDown className={`w-4 h-4 hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>{isUserMenuOpen && <ProfileMenu />}</AnimatePresence>
            </div>
          ) : (
            <button onClick={() => navigate('/LoginFormUser')} className="flex items-center gap-2 text-black font-medium p-2 hover:text-blue-600">
              <LogIn className="w-5 h-5" /> <span className="hidden sm:block">Sign In</span>
            </button>
          )}

          <motion.button className="lg:hidden p-2 text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200">
            <div className="flex flex-col items-center p-4 gap-3">
              {menuItems.map((item) => (
                <button key={item.name} onClick={() => { setIsMenuOpen(false); navigate(item.to); }}
                  className={`font-medium ${location.pathname === item.to ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}>
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
