'use client';

import Aos from 'aos';
import { useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaShippingFast } from 'react-icons/fa';

const steps = [
  {
    title: "Browse Products",
    description: "Explore a wide range of quality wholesale products by category or search.",
    icon: <FaSearch />,
  },
  {
    title: "Place Your Order",
    description: "Add items to cart and confirm your order securely with flexible payment options.",
    icon: <FaShoppingCart />,
  },
  {
    title: "Fast Delivery",
    description: "We pack and ship your order quickly so your business never slows down.",
    icon: <FaShippingFast />,
  },
];

const HowItWorks = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <section
      data-aos="fade-right"
      className="w-full overflow-hidden bg-blue-50 py-16 px-4 sm:px-6 lg:px-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4"
        >
          How It Works
        </h2>
        <p
          data-aos="fade-down"
          className="text-blue-700 text-sm sm:text-base max-w-xl mx-auto mb-10"
        >
          Just 3 easy steps to get your wholesale orders delivered straight to your door.
        </p>

        <div
          data-aos="fade-right"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl text-blue-600 mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-1 text-blue-900">
                {step.title}
              </h3>
              <p className="text-sm text-blue-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
