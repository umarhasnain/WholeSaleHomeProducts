'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">ZentraWholeSale</h2>
          <p className="text-sm">
            Leading wholesale supplier offering a wide range of quality products at competitive prices.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Deals</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 1721 Greenhouse Rd, Houston, TX 77084, USA</li>
            <li>📞 +18325436353</li>
            <li>✉️ info.wholesalehomeproducts@gmail.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-blue-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} ZentraWholeSale. All rights reserved.
      </div>
    </footer>
  );
}
