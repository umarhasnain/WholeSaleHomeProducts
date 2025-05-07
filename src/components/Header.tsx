"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

import { auth } from "@/firebase/FirebaseConfig";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiBox,
  FiCoffee,
  FiGift,
  FiShoppingBag,
  FiClock,
  FiSun,
  FiArchive,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/DataContext";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

const categories = [
  { name: "Electronics", icon: <FiBox /> },
  { name: "Health & Household", icon: <FiCoffee /> },
  { name: "Home & Kitchen", icon: <FiGift /> },
  { name: "Automotive", icon: <FiShoppingBag /> },
  { name: "Sports & Outdoor", icon: <FiClock /> },
  { name: "Tools & Home Improvement", icon: <FiSun /> },
  { name: "Beauty & Personal Care", icon: <FiArchive /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "categories">(
    "categories"
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  //   setUser(currentUser);
  // }, []);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // router.replace(firebaseUser ? "/account/my-account" : "/signup");
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      router.push(`/categoryDetails/${category}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleMobileCategoryClick = (category: string) => {
    router.push(`/categoryDetails/${category}`);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMobileSearch = () => {
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 flex-wrap gap-y-2 sm:flex-nowrap">
          <Link href="/">
            <div className="flex items-center space-x-1 text-center sm:text-left">
              <span className="text-blue-600 font-bold text-sm uppercase">
                WholeSale
              </span>
              <span className="text-2xl font-bold text-black">
                HomeProducts
              </span>
              {/* <div className="hidden md:block">
                <UserModeBadge /> 
              </div> */}
            </div>
          </Link>

          <div className="hidden lg:flex items-center flex-1 mx-4">
            <div className="flex w-full border border-slate-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-2 focus:outline-none text-sm"
              />
              <select
                className="border-l px-3 outline-none text-sm text-gray-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-blue-600 px-3 flex items-center justify-center text-white"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <Link href="/cart" className="relative">
              <FiShoppingCart className="h-6 w-6 hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href={user ? "/account/my-account" : "/signup"}>
              <FaUserCircle className="h-6 w-6 hover:text-blue-600" />
            </Link>
            {/* 
            <Link href="/quoteForm">
              <button className="hidden sm:inline-block hover:bg-blue-500 hover:border-2 border-blue-500 px-3 py-1 text-sm hover:text-white rounded-md">
                Request a Quote
              </button>
            </Link> */}

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
        className={`fixed top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b text-black">
          <input
            type="text"
            placeholder="Search for products"
            value={mobileSearchQuery}
            onChange={(e) => setMobileSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleMobileSearch()}
            className="w-full border rounded px-3 py-2 text-sm text-black focus:outline-blue-500"
          />
          <button onClick={handleMobileSearch}>
            <FiSearch className="ml-2 h-5 w-5 text-gray-600" />
          </button>
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <FiX className="ml-4 h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex-1 py-2 text-sm font-medium ${activeTab === "menu" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
          >
            MENU
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 py-2 text-sm font-medium ${activeTab === "categories" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
          >
            CATEGORIES
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-144px)]">
          {activeTab === "menu" ? (
            <div className="flex flex-col space-y-3 text-md text-gray-700">
              {!user ? (
                <Link href="/signup">
                  <span
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-blue-600 block"
                  >
                    Login / Register
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="hover:text-blue-600 block text-left w-full"
                >
                  Logout
                </button>
              )}
              {/* <Link href="/quoteForm">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 block"
                >
                  Quote
                </span>
              </Link> */}

              {/* <div className="flex justify-between items-center p-4 shadow w-40 bg-white">
                <UserModeBadge />
              </div> */}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  onClick={() => handleMobileCategoryClick(cat.name)}
                  className="flex items-center py-3 space-x-3 hover:bg-gray-50 rounded px-2 cursor-pointer"
                >
                  <div className="text-lg text-gray-600">{cat.icon}</div>
                  <span className="text-sm font-medium text-gray-800">
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
