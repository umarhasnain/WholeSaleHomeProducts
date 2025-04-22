"use client";

import { useState, useMemo, useContext, useEffect } from "react";
import { DataContext, Product } from "@/context/DataContext";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 8;

const AllProducts = () => {
  const context = useContext(DataContext);

  // ✅ Wrap dataSet in useMemo to avoid recalculating on every render
  const dataSet: Product[] = useMemo(() => context?.products ?? [], [context?.products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory, currentPage]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(dataSet.map((p) => p.category)));
    return ["All", ...cats];
  }, [dataSet]);

  const filteredProducts = useMemo(() => {
    return dataSet.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dataSet, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <div className="px-4 sm:px-8 py-10">
      {/* Header Filter */}
      <div className="mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 animate-pulse h-72 rounded-lg"
              ></div>
            ))
          : paginatedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative w-full h-56">
                  <Link href={`/productDetails/${product.id}`}>
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </Link>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <Link href={`/productDetails/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500">{product.category}</p>

                  <Link href={`/productDetails/${product.id}`}>
                    <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Add To Quote Request
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-black rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-black rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* No products found */}
      {!isLoading && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AllProducts;
