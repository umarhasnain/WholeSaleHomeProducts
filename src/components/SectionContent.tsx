import Image from "next/image";
import Link from "next/link";

const SectionContent = () => {
  return (
    <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="text-center md:text-left mb-10 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            Your Trusted <span className="text-blue-600">Wholesale Marketplace</span>
          </h1>
          <p className="mt-4 text-blue-700 text-lg">
            Shop electronics, kitchen, tools, health & more at unbeatable wholesale prices.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
            <Link href="/shop">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Start Shopping
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/hero-banner.png" // replace this with your actual image path
            alt="Wholesale Hero"
            width={500}
            height={400}
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionContent;
