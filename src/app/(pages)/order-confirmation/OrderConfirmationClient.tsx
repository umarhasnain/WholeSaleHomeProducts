// app/(pages)/order-confirmation/OrderConfirmationClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">🎉 Order Confirmed!</h1>
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-gray-700 mb-4"> We will process it shortly.</p>
      {orderId ? (
        <p>Your Order ID is: <strong>{orderId}</strong></p>
      ) : (
        <p>No order ID found.</p>
      )}
    </div>
  );
}
