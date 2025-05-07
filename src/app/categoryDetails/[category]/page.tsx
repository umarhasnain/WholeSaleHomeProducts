"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext, DataContext, Product } from "@/context/DataContext";
import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { useParams } from "next/navigation";
import { MdAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CategoryPage = () => {
  const params = useParams();
  const context = useContext(DataContext);
  const cartContext = useContext(CartContext);
  const dataSet: Product[] = useMemo(() => context?.products ?? [], [context?.products]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const rawCategory = params?.category?.toString() || "";
  const cleanedCategory = decodeURIComponent(rawCategory)
    .replace(/[%\s]/g, "")
    .toLowerCase();

  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-out", once: false });
  }, []);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
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

  
  const handleAddToCart = (product: Product) => {
    if (!cartContext) return;
    cartContext.addToCart(product);
    toast.success(`${product.name} added to cart!`);
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
              filteredProducts.map((offer,index) => (
                <div
              key={index}
              className="bg-blue-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-60">
                <Link href={`/productDetails/${offer.id}`}>
                  <Image
                    src={offer.imageUrls[0]}
                    alt={offer.name}
                    layout="fill"
                    objectFit="cover"
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

                {/* ✅ Show wholesale or retail price based on login */}
                <h3 className="text-base sm:text-lg font-semibold text-black">
                  Price: {isLoggedIn ? offer.wholesalePrice : offer.retailPrice} $
                </h3>

                {/* Show wholesale message if not logged in */}
                {!isLoggedIn && (
                  <Link href="/signup">
                    <button
                      className="mt-2 w-full py-2 text-sm text-center bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition"
                    >
                      👁️ To see wholesale prices, please log in
                    </button>
                  </Link>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleAddToCart(offer)}
                  className="mt-3 w-full flex justify-center items-center gap-2 text-xl py-2 bg-blue-700 text-white cursor-pointer rounded hover:bg-blue-800 transition"
                >
                  <MdAddShoppingCart /> Add To Cart
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
