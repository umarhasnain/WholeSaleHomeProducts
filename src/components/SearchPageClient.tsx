"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DataContext, Product as ProductType } from "@/context/DataContext";
import Image from "next/image";

interface Product extends Omit<ProductType, "imageUrls"> {
  imageUrls?: string[];
}

export default function SearchPageClient() {
  const context = useContext(DataContext);
  const dataSet = useMemo<Product[]>(() => context?.products ?? [], [context]);

  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const filtered = dataSet.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setProducts(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, dataSet]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for &quot;{query}&quot;
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-red-500">No products found for &quot;{query}&quot;</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 7).map((offer, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Link href={`/productDetails/${offer.id}`}>
                <div className="relative w-full h-60">
                  <Image
                    src={offer.imageUrls?.[0] || "/fallback.jpg"}
                    alt={offer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-5 text-left space-y-2 flex-grow flex flex-col justify-between">
                <Link href={`/productDetails/${offer.id}`}>
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900">
                    {offer.name}
                  </h3>
                </Link>
                <Link href={`/productDetails/${offer.id}`}>
                  <button className="mt-3 w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                    Add To Quote Request
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
