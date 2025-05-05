// 'use client';

// import { useSearchParams } from 'next/navigation';

// const OrderConfirmation = () => {
//   const params = useSearchParams();
//   const orderId = params.get('id');

//   return (
//     <div className="max-w-2xl mx-auto text-center py-20">
//       <h1 className="text-3xl font-bold mb-4">🎉 Order Confirmed!</h1>
//       <p className="text-gray-700 mb-4">Thank you for your purchase.</p>
//       <p className="text-gray-700 mb-4"> We will process it shortly.</p>
//       <p className="text-sm text-gray-500">Your Order ID: <strong>{orderId}</strong></p>
//     </div>
//   );
// };

// export default OrderConfirmation;

// app/(pages)/order-confirmation/page.tsx

import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient'; // next step me banayenge

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading order confirmation...</div>}>
      <OrderConfirmationClient />
    </Suspense>
  );
}
