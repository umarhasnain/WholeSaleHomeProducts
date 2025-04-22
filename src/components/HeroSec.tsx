"use client";
import Aos from "aos";
import Image from "next/image";
import { useEffect } from "react";

const HeroSection1 = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <section
      data-aos="fade-up"
      className="bg-gradient-to-r from-blue-50 to-blue-100 py-20 px-6 md:px-16"
    >
      <div
        data-aos="fade-down"
        className="w-full overflow-hidden max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
      >
        {/* Text Section */}
        <div data-aos="fade-up" className="flex-1 text-center md:text-left">
          <h1
            data-aos="fade-left"
            className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight"
          >
            Power Your Business <br />
            with{" "}
            <span data-aos="fade-right" className="text-blue-600">
              Wholesale Deals
            </span>
          </h1>
          <p data-aos="fade-up" className="text-blue-700 mt-4 text-lg max-w-lg">
            Get unbeatable prices on top-quality products across Electronics,
            Home, Health & more — shipped directly to your shop.
          </p>
          <div
            data-aos="fade-down"
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition">
              Your Hub for Wholesale
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-600 hover:text-white transition">
              Stay — Everything&apos;s Here
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div data-aos="fade-down" className="flex-1">
          <Image
            src="/assets/images/images.jpg"
            alt="Wholesale Products"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection1;
