"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/FirebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

type Quote = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  product: string;
  quantity: string;
  description: string;
  createdAt: string;
};

export default function QuoteRequests() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || "",
        })) as Quote[];

        setQuotes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        📦 Customer Quote Requests
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading quote requests...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 hover:shadow-xl transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{quote.name}</h3>

              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">📧 Email:</span> {quote.email}</p>
                <p><span className="font-medium">📱 Phone:</span> {quote.phone}</p>
                <p><span className="font-medium">🏠 Address:</span> {quote.address}</p>
                <p><span className="font-medium">🛒 Product:</span> {quote.product}</p>
                <p><span className="font-medium">📦 Quantity:</span> {quote.quantity}</p>
              </div>

              <div className="bg-gray-100 mt-3 p-3 rounded-md text-sm text-gray-700">
                <span className="font-medium">📝 Description:</span> {quote.description}
              </div>

              <div className="text-xs text-right text-gray-400 mt-4">
                {new Date(quote.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && quotes.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No quote requests found.
        </div>
      )}
    </div>
  );
}
