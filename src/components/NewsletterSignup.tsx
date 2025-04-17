"use client";

import { useState } from "react";

const NewsletterAndContact = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [name, setName] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      alert("Enter a valid email.");
      return;
    }
    setSubmitted(true);
    setEmail("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactEmail || !message) {
      alert("Please fill all fields.");
      return;
    }
    console.log("Contact form submitted:", { name, contactEmail, message });
    alert("Thanks for reaching out!");
    setName("");
    setContactEmail("");
    setMessage("");
  };

  return (
    <section className="bg-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Newsletter Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">📧 Subscribe to Our Newsletter</h2>
          <p className="text-blue-700 mb-6">
            Get updates about wholesale deals, product drops, and exclusive offers.
          </p>
          {!submitted ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-green-600 mt-4">Thanks for subscribing! 🎉</p>
          )}
        </div>

        {/* Contact Form Section */}
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">📩 Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-700 text-white w-full py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterAndContact;
