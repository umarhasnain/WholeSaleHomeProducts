'use client';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';

interface Order {
  orderId: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userOrders: Order[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userOrders.push({
            orderId: data.orderId,
            date: data.date,
            status: data.status,
            total: data.total,
            items: data.items,
          });
        });

        setOrders(userOrders);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">My Orders</h2>

      {loading ? (
        <div className="text-center p-4">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="border p-4 rounded bg-gray-50 text-center text-gray-600">
          You have not placed any orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-lg shadow-sm"
            >
              <div>
                <div className="font-semibold">Order #{order.orderId}</div>
                <div className="text-sm text-gray-500">{new Date(order.date).toDateString()}</div>
              </div>
              <div className="text-sm text-gray-700">{order.status}</div>
              <div className="text-sm text-gray-700">
                ${order.total.toFixed(2)} for {order.items} items
              </div>
              <button className="mt-2 md:mt-0 bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-4 py-1 rounded">
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
