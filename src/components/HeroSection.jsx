'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLaptop, FaHeart, FaHome, FaCar, FaBasketballBall, FaTools } from "react-icons/fa";

const categories = [
  { name: "Electronics", icon: <FaLaptop /> },
  { name: "Health & Household", icon: <FaHeart /> },
  { name: "Home & Kitchen", icon: <FaHome /> },
  { name: "Automotive", icon: <FaCar /> },
  { name: "Sports & Outdoor", icon: <FaBasketballBall /> },
  { name: "Tools & Home Improvement", icon: <FaTools /> },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Buy Wholesale Products at Unbeatable Prices
          </h1>
          <p className="text-base sm:text-lg text-blue-100 mb-6 max-w-md">
            Explore our huge collection of premium wholesale categories like furniture, fashion, accessories, and more. Quality and value, delivered to your doorstep.
          </p>
          <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-100 transition">
            Start Shopping
          </button>
        </motion.div>

        {/* Right Content - Animated Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              className="bg-white bg-opacity-10 p-4 sm:p-5 rounded-xl flex flex-col items-center text-center shadow-lg backdrop-blur-md hover:scale-105 transition-transform cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="text-2xl sm:text-3xl mb-2 text-black">{cat.icon}</div>
             <Link href={`/categoryDetails/${cat.name}`}>
             <h3 className="text-sm sm:text-base text-black font-semibold">{cat.name}</h3>
             </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
