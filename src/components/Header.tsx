'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import {
  FiMenu, FiX, FiSearch, FiShoppingCart,
  FiBox, FiCoffee, FiGift, FiShoppingBag,
  FiClock, FiSun, FiArchive
} from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

// Define the User type (adjust as needed for your app)
interface User {
  id: string;
  name: string;
  email: string;
  // Add other properties as required
}

const categories = [
  { name: 'Electronics', icon: <FiBox /> },
  { name: 'Health & Household', icon: <FiCoffee /> },
  { name: 'Home & Kitchen', icon: <FiGift /> },
  { name: 'Automotive', icon: <FiShoppingBag /> },
  { name: 'Sports & Outdoor', icon: <FiClock /> },
  { name: 'Tools & Home Improvement', icon: <FiSun /> },
  { name: 'Toys', icon: <FiArchive /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'categories'>('categories');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [user, setUser] = useState<User | null>(null); // Initialize user state with null
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    // Check for the logged-in user when the component mounts (you can adjust this based on your auth system)
    // Example using Firebase auth, replace with your authentication logic
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null'); // Mock example
    setUser(currentUser); // Set user if found
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      // Navigate to the category details page when a category is selected
      router.push(`/categoryDetails/${category}`);
    }
  };

  const handleLogout = () => {
    // Logic to log out the user (this is just an example)
    localStorage.removeItem('user');
    setUser(null); // Clear user from state
  };

  return (
    <>
      {/* Top Header */}
      <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 flex-wrap gap-y-2 sm:flex-nowrap">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-1 text-center sm:text-left">
              <span className="text-blue-600 font-bold text-sm uppercase">WholeSale</span>
              <span className="text-2xl font-bold text-black">HomeProducts</span>
            </div>
          </Link>

          {/* Search bar (hidden on small screens) */}
          <div className="hidden lg:flex items-center flex-1 mx-4">
            <div className="flex w-full border border-slate-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-4 py-2 focus:outline-none text-sm"
              />
              <select
                className="border-l px-3 outline-none text-sm text-gray-500"
                value={selectedCategory}
                onChange={handleCategoryChange} // Updated onChange function
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              
              <button 
                onClick={() => selectedCategory && router.push(`/categoryDetails/${selectedCategory}`)} // Button functionality
                className="bg-blue-600 p-3 text-white"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Icons and Mobile Menu */}
          <div className="flex items-center space-x-3 text-gray-600">
            <Link href="/cart">
              <FiShoppingCart className="h-6 w-6 hover:text-blue-600" />
            </Link>
            
            {/* Show My Account link if the user is logged in */}
            {user ? (
              <Link href="/my-account">
                <FaUserCircle className="h-6 w-6 hover:text-blue-600" />
              </Link>
            ) : (
              <Link href="/signup">
                <FaUserCircle className="h-6 w-6 hover:text-blue-600" />
              </Link>
            )}

            <Link href="/quoteForm">
              <button className="hidden sm:inline-block hover:bg-blue-500 hover:border-2 border-blue-500 px-3 py-1 text-sm hover:text-white rounded-md">
                Request a Quote
              </button>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b text-black">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border rounded px-3 py-2 text-sm text-black focus:outline-blue-500"
          />
          <FiSearch className="ml-2 text-gray-600" />
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <FiX className="ml-4 h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-2 text-sm font-medium ${activeTab === 'menu' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            MENU
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2 text-sm font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            CATEGORIES
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-144px)]">
          {activeTab === 'menu' ? (
            <div className="flex flex-col space-y-3 text-md text-gray-700">
              {/* Conditional rendering of login/signup or my account */}
              {!user ? (
                <Link className="hover:text-blue-600" href="/signup">
                  Login / Register
                </Link>
              ) : (
                <button onClick={handleLogout} className="hover:text-blue-600">
                  Logout
                </button>
              )}
              <Link href="/quoteForm" className="hover:text-blue-600">
                Quote
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="flex items-center py-3 space-x-3 hover:bg-gray-50 rounded px-2 cursor-pointer"
                >
                  <div className="text-lg text-gray-600">{cat.icon}</div>
                  <Link href={`/categoryDetails/${cat.name}`}>
                    <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
