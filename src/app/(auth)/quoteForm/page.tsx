// components/QuoteForm.tsx
'use client';

import { useState } from "react";
import { db } from "@/firebase/FirebaseConfig.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { FiSend } from "react-icons/fi";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    product: "",
    quantity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await addDoc(collection(db, "quotes"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      setFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        product: "",
        quantity: "",
        description: "",
      });

      setSuccess("Quote request submitted successfully!");
    } catch (error) {
      console.error("Error adding quote:", error);
      setSuccess("Failed to submit quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 mb-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Request a Quote</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            placeholder="Product Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="Quantity"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Write your requirements here..."
          className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className={`w-full flex justify-center items-center gap-2 px-4 py-3 text-white rounded-md ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          <FiSend className="text-lg" />
          {loading ? "Submitting..." : "Submit Quote"}
        </button>

        {success && (
          <p className="text-center text-sm text-green-600 mt-2">{success}</p>
        )}
      </form>
    </div>
  );
}
