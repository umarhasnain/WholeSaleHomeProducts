// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { app } from "@/firebase/FirebaseConfig";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// // Define the shape of the order
// interface Order {
//   total: number;
//   [key: string]: unknown;
// }

// // Email sender function
// const sendConfirmationEmail = async (
//   name: string,
//   email: string,
//   orderId: string,
//   total: string
// ): Promise<void> => {
//   const functions = getFunctions(app);
//   const sendOrderConfirmation = httpsCallable(functions, "sendOrderConfirmation");

//   try {
//     const res = await sendOrderConfirmation({
//       name,
//       email,
//       orderId,
//       total,
//     });
//     console.log("Order Confirmation Result:", res.data);
//   } catch (err) {
//     console.error("Error in sending order confirmation email:", err);
//   }
// };

// export default function OrderConfirmation() {
//   const [user, setUser] = useState<User | null>(null);
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [emailSent, setEmailSent] = useState<boolean>(false);

//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("id");

//   useEffect(() => {
//     if (!orderId || emailSent) return;

//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (!firebaseUser) {
//         console.warn("No user is signed in.");
//         setLoading(false);
//         return;
//       }

//       setUser(firebaseUser);

//       const db = getFirestore(app);
//       const orderRef = doc(db, "orders", orderId);
//       const orderSnap = await getDoc(orderRef);

//       if (!orderSnap.exists()) {
//         console.warn("Order not found.");
//         setLoading(false);
//         return;
//       }

//       const orderData = orderSnap.data() as Order;
//       setOrder(orderData);

//       await sendConfirmationEmail(
//         firebaseUser.displayName || "Customer",
//         firebaseUser.email || "no-reply@example.com",
//         orderId,
//         orderData.total.toString()
//       );

//       setEmailSent(true);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [orderId, emailSent]);

//   if (loading) return <div>Loading...</div>;
//   if (!user) return <div>⚠️ You must be signed in to view this page.</div>;
//   if (!order) return <div>⚠️ Order not found.</div>;

//   return (
//     <div className="max-w-xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-4">🎉 Order Confirmed!</h1>
//       <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
//       <p className="text-gray-700 mb-2">We will process it shortly.</p>
//       <p>Your Order ID is: <strong>{orderId}</strong></p>
//       <p>Total Amount: Rs. {order.total.toLocaleString()}</p>
//       {emailSent && (
//         <p className="mt-4 text-green-600">
//           ✅ A confirmation email has been sent to <strong>{user.email}</strong>
//         </p>
//       )}
//     </div>
//   );
// }



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
  email?: string;
  name?: string;
  [key: string]: unknown;
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
    console.log("✅ Order Confirmation Result:", res.data);
  } catch (err) {
    console.error("❌ Error in sending order confirmation email:", err);
  }
};

export default function OrderConfirmation() {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  useEffect(() => {
    if (!orderId || emailSent) return;

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }

      const db = getFirestore(app);
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (!orderSnap.exists()) {
        console.warn("❌ Order not found.");
        setLoading(false);
        return;
      }

      const orderData = orderSnap.data() as Order;
      setOrder(orderData);

      const nameToSend =
        firebaseUser?.displayName || orderData.name || "Customer";
      const emailToSend =
        firebaseUser?.email || orderData.email || "no-reply@example.com";

      await sendConfirmationEmail(
        nameToSend,
        emailToSend,
        orderId,
        orderData.total.toString()
      );

      setEmailSent(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId, emailSent]);

  if (loading) return <div className="text-center py-10">⏳ Loading...</div>;
  if (!order) return <div className="text-center py-10">❌ Order not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-center">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Thank you for your order!</h2>
        <p className="text-gray-700 mb-2">We will process it shortly.</p>
        <div className="mt-4 text-left">
          <p className="text-gray-800"><strong>Order ID:</strong> {orderId}</p>
          {/* <p className="text-gray-800"><strong>Email: </strong> {user?.email || order.email}</p> */}
          {user?.email && (
          <p className=" text-gray-800 font-medium">
            Email <strong>{user?.email || order.email}</strong>
          </p>
        )} 
          <p className="text-gray-800">
            <strong>Total Amount:</strong> Rs. {order.total.toLocaleString()}
          </p>
        </div>
        {/* {emailSent && (
          <p className="mt-6 text-green-500 font-medium">
            ✅ Confirmation email has been sent to <strong>{user?.email || order.email}</strong>
          </p>
        )} */}
      </div>
    </div>
  );
}
