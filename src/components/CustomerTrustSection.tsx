'use client';

import Aos from 'aos';
import { useEffect } from 'react';
import { FaStar, FaHandshake, FaUserFriends } from 'react-icons/fa';

const CustomerTrustSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <section
      data-aos="fade-up"
      className="bg-white py-16 px-4 sm:px-6 lg:px-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          data-aos="fade-right"
          className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4"
        >
          Trusted by Thousands of Retailers
        </h2>
        <p
          data-aos="fade-down"
          className="text-sm sm:text-base text-blue-700 max-w-2xl mx-auto mb-12"
        >
          We’ve built strong relationships with small businesses, shopkeepers, and resellers all across Pakistan.
        </p>

        <div
          data-aos="fade-left"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-blue-700"
        >
          <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-3">
              <FaUserFriends className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">10,000+ Happy Retailers</h3>
            <p className="text-sm mt-2">
              Businesses that trust us for regular inventory at wholesale prices.
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-3">
              <FaStar className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">4.9/5 Average Rating</h3>
            <p className="text-sm mt-2">
              Consistent service, quality products, and fast delivery — that’s our promise.
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-3">
              <FaHandshake className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Strong B2B Relationships</h3>
            <p className="text-sm mt-2">
              We go beyond transactions to build long-lasting wholesale partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTrustSection;
