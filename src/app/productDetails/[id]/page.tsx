'use client';

import React, { useState, useContext, useRef, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { DataContext } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  imageUrls: string[];
};

const ProductDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id?.toString();

  const context = useContext(DataContext);
  const dataSet: Product[] = context?.products ?? [];

  const product = dataSet.find((p: Product) => p.id === id);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <main className="p-6 flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Product not found.</p>
      </main>
    );
  }

  const imagesToDisplay = product.imageUrls?.length > 0 ? product.imageUrls : [product.imageUrl];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? imagesToDisplay.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === imagesToDisplay.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = imageContainerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          aria-label="Go back"
        >
          <FiArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-blue-800">Product Details</h1>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col md:flex-row gap-8">
          <section className="md:w-1/2 w-full flex flex-col items-center relative">
            <div
              ref={imageContainerRef}
              className="relative w-full h-[300px] md:h-[400px]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <Image
                src={imagesToDisplay[currentImage]}
                alt={product.name}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg shadow-xl cursor-zoom-in"
                priority
              />

              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
                aria-label="Previous Image"
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
                aria-label="Next Image"
              >
                &rarr;
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {imagesToDisplay.map((url, index) => (
                <div key={index} className="relative w-16 h-16">
                  <Image
                    src={url}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    quality={100}
                    sizes="64px"
                    onClick={() => setCurrentImage(index)}
                    className={`object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
                      currentImage === index ? 'border-blue-600 scale-105' : 'border-transparent'
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Zoom Preview Pane */}
          {isZooming && (
            <section className="hidden md:block md:w-1/2">
              <div
                className="w-full h-[400px] border rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${imagesToDisplay[currentImage]})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '200%',
                }}
              />
            </section>
          )}

          {/* Product Info */}
          {!isZooming && (
            <section className="md:w-1/2 w-full">
              <h2 className="text-4xl font-bold text-blue-800 mb-4">{product.name}</h2>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-medium">Category:</span> {product.category || 'Not specified'}
              </p>

              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <Link href="/quoteForm">
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
                  Send Quote Request
                </button>
              </Link>
            </section>
          )}
        </div>
      </Suspense>
    </main>
  );
};

export default ProductDetails;
