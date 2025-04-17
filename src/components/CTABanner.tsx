'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Aos from 'aos';
import Image from 'next/image';

const CTABanner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <motion.div
      className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex justify-between items-center my-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      <div data-aos="fade-down" className="text-center max-w-md">
        <h2 data-aos="fade-left" className="text-3xl font-extrabold mb-4">
          Unlock Your Potential Today!
        </h2>
        <p data-aos="fade-down" className="text-lg mb-4">
          Whether you&apos;re starting a new project or looking to scale, we&apos;ve got the tools and expertise to make it happen. Take the first step now!
        </p>
        <a
          href="#services"
          data-aos="fade-right"
          className="inline-block bg-blue-600 text-white text-lg py-3 border border-blue-400 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Get Started Now
        </a>
      </div>

      {/* Image Section */}
      <motion.div
        className="hidden lg:block flex-shrink-0 ml-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
      >
        <Image
          src="/assets/images/ecomerce.jpg" // Make sure the image path is correct
          data-aos="fade-down"
          width={300}
          height={300}
          alt="Engaging Image"
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default CTABanner;
