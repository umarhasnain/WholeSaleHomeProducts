'use client';

import { useEffect } from 'react';
import {  FaTags, FaCheckCircle } from 'react-icons/fa';
import AOS from 'aos';

const features = [
  {
    icon: <FaTags className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Bulk Discount Prices",
    description: "Get wholesale rates with huge savings on every order.",
  },
  {
    icon: <FaCheckCircle className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Verified Product Quality",
    description: "We ensure quality with every product before it reaches you.",
  },

];

const WhyBuySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <section className="w-full overflow-hidden bg-blue-50 py-16 px-4 sm:px-6 lg:px-10">
      <div data-aos="fade-up" className="max-w-7xl mx-auto text-center">
        <h2 data-aos="fade-right" className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
          Why Buy Wholesale from Us?
        </h2>
        <p data-aos="fade-left" className="text-sm sm:text-base text-blue-700 max-w-2xl mx-auto mb-10">
          Our mission is to make wholesale shopping easy, affordable, and reliable. Here’s why businesses trust us.
        </p>

        <div
          data-aos="fade-down"
          className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:mx-24 gap-6 sm:gap-8 "
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center items-center mb-4">{feature.icon}</div>
              <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                {feature.title}
              </h3>
              <p className="text-sm text-blue-700 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBuySection;
