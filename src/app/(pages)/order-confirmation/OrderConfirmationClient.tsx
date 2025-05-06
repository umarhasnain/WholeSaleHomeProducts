"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/firebase/FirebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Define the shape of the order
interface Order {
  total: number;
  [key: string]: unknown; // optional: allows other fields without using `any`
}

// Email sender function
const sendConfirmationEmail = async (
  name: string,
  email: string,
  orderId: string,
  total: string
): Promise<void> => {
  const functions = getFunctions(app);
  const sendOrderConfirmation = httpsCallable(functions, "sendOrderConfirmation");

  try {
    const res = await sendOrderConfirmation({
      name,
      email,
      orderId,
      total,
    });
    console.log("Order Confirmation Result:", res.data);
  } catch (err) {
    console.error("Error in sending order confirmation email:", err);
  }
};

export default function OrderConfirmation() {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (!orderId) return;

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        console.warn("No user is signed in.");
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      const db = getFirestore(app);
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (!orderSnap.exists()) {
        console.warn("Order not found.");
        setLoading(false);
        return;
      }

      const orderData = orderSnap.data() as Order;
      setOrder(orderData);

      await sendConfirmationEmail(
        firebaseUser.displayName || "Customer",
        firebaseUser.email || "no-reply@example.com",
        orderId,
        orderData.total.toString()
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!order || !user) return <div>Order or user data not found.</div>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Confirmed!</h1>
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-gray-700 mb-4">We will process it shortly.</p>
      <p>Your Order ID is: <strong>{orderId}</strong></p>
      <p>Total Amount: ${order.total}</p>
    </div>
  );
}
