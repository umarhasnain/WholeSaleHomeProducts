"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext, Product } from "@/context/DataContext";
import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const context = useContext(DataContext);

  const dataSet: Product[] = useMemo(() => context?.products ?? [], [context?.products]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const rawCategory = params?.category?.toString() || "";
  const cleanedCategory = decodeURIComponent(rawCategory)
    .replace(/[%\s]/g, "")
    .toLowerCase();

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: false });
  }, []);

  useEffect(() => {
    if (dataSet.length > 0 && cleanedCategory) {
      const result = dataSet.filter((product) =>
        product.category.replace(/[%\s]/g, "").toLowerCase().includes(cleanedCategory)
      );
      setFilteredProducts(result);
      setLoading(false);
    }
  }, [cleanedCategory, dataSet]);

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
          🎁 Products in &quot;{cleanedCategory}&quot; Category
        </h2>
        <p data-aos="fade-down" className="text-sm sm:text-base text-blue-700 mb-12">
          Discover exclusive {cleanedCategory} products before time runs out!
        </p>

        {loading ? (
          <p className="text-gray-500 text-lg">Loading products...</p>
        ) : (
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-blue-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full h-60">
                    <Link href={`/productDetails/${offer.id}`}>
                      <Image
                        src={offer.imageUrls[0]}
                        alt={offer.name}
                        fill
                        className="object-cover w-full h-60"
                      />
                    </Link>
                    {offer.discount && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow">
                        {offer.discount}
                      </span>
                    )}
                  </div>
                  <div className="p-5 text-left space-y-2 flex-grow flex flex-col justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                      {offer.name}
                    </h3>
                    <button className="mt-3 w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                      Add To Quote Request
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl text-gray-500 col-span-full">
                No products found in this category.
              </div>
            )}
          </div>
        )}

        <div className="mt-12 flex justify-center items-center gap-2 text-blue-700 font-medium">
          <FaClock className="animate-pulse" />
          <span>Hurry up! These offers end soon.</span>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
