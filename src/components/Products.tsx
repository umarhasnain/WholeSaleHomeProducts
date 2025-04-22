"use client";

import { DataContext, Product } from "@/context/DataContext";
import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/DataContext";  

const ProductData = () => {
  const context = useContext(DataContext);
  const cartContext = useContext(CartContext);
  const dataSet: Product[] = context?.products ?? [];

  console.log('data===>', dataSet);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    cartContext?.addToCart(product);
  };

  return (
    <section
      data-aos="fade-down"
      className="w-full overflow-hidden bg-white py-20 px-4 sm:px-6 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          data-aos="fade-left"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4"
        >
          Our Products
        </h2>
        <p
          data-aos="fade-down"
          className="text-sm sm:text-base text-blue-700 mb-12"
        >
          Explore Our Products!
        </p>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {dataSet.map((offer, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-60">
                <Link href={`/productDetails/${offer.id}`}>
                  <Image
                    src={offer.imageUrls[0]}
                    alt={offer.name}
                    layout="fill" // Ensure you use `layout="fill"`
                    objectFit="cover" // To maintain aspect ratio and fill the area
                    className="object-cover"
                  />
                </Link>
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow">
                  {offer.discount}
                </span>
              </div>
              <div className="p-5 text-left space-y-2 flex-grow flex flex-col justify-between">
                <Link href={`/productDetails/${offer.id}`}>
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                    {offer.name}
                  </h3>
                </Link>
                {/* Add To Quote Request button, which now adds product to cart */}
                <button
                  onClick={() => handleAddToCart(offer)}  // Add to cart functionality
                  className="mt-3 w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                >
                  Add To Quote Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductData;
