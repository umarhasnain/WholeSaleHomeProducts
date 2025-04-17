'use client';

import Aos from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';

const BulkOrderCTA = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <section
      data-aos="fade-left"
      className="w-full overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-20 text-white"
    >
      <div
        data-aos="fade-up"
        className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6"
      >
        <h2
          data-aos="fade-right"
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
        >
          Need Bulk Products for Your Business?
        </h2>
        <p
          data-aos="fade-down"
          className="text-sm sm:text-base md:text-lg max-w-2xl"
        >
          Get exclusive wholesale pricing, fast delivery, and quality assurance on every order. Perfect for resellers, retailers, and corporate needs.
        </p>
        <Link href="/contact">
          <button
            data-aos="fade-up"
            className="mt-2 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-blue-100 transition duration-300"
          >
            Get a Custom Quote
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BulkOrderCTA;
