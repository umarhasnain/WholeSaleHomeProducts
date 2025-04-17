
'use client'
import Aos from "aos";
import Link from "next/link";
import { useEffect } from "react";
import { FaLaptop, FaHeart, FaHome, FaCar, FaBasketballBall, FaTools } from "react-icons/fa";

const categories = [
  { name: "Electronics", icon: <FaLaptop /> },
  { name: "Health & Household", icon: <FaHeart /> },
  { name: "Home & Kitchen", icon: <FaHome /> },
  { name: "Automotive", icon: <FaCar /> },
  { name: "Sports & Outdoor", icon: <FaBasketballBall /> },
  { name: "Tools & Home Improvement", icon: <FaTools /> },
];

const TopCategories = () => {
    useEffect(() => {
      Aos.init({
        duration: 1000, // Animation duration in milliseconds
        easing: 'ease-in-out', // Easing effect
        once: false, // Run animation once
      });
    }, []);
  return (
    <section data-aos="fade-up" className="bg-white py-16 px-6 md:px-20">
      <div data-aos="fade-down" className="w-full overflow-hidden max-w-7xl mx-auto text-center">
        <h2 data-aos="fade-up" className="text-3xl font-bold text-blue-900 mb-4">
          Explore Our Top Categories
        </h2>
        <p data-aos="fade-down" className="text-blue-700 mb-12 max-w-xl mx-auto">
          Everything you need — in one place. Get premium products at wholesale rates across all top niches.
        </p>

        <div data-aos="fade-up" className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-blue-700">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg hover:bg-blue-100 transition duration-300"
            >
              <div className="text-4xl text-blue-600 mb-3">{cat.icon}</div>
              <Link href={`/categoryDetails/${cat.name}`}>
              
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
