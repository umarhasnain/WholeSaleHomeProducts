'use client';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderId: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formattedDates, setFormattedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("date===> ",formattedDates);
  
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
          const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : null;
          userOrders.push({
            orderId: data.orderId || doc.id,
            date: createdAt ? createdAt.toISOString() : '',
            status: data.status || 'Pending',
            total: data.total || 0,
            items: Array.isArray(data.items) ? data.items : [],
          });
        });

        setOrders(userOrders);

        // Format dates safely
        const dates = userOrders.map((order) =>
          order.date ? new Date(order.date).toDateString() : 'No Date'
        );
        setFormattedDates(dates);
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
          {orders.map((order, index) => (
            <div
              key={order.orderId}
              className="flex flex-col gap-4 border p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <div className="font-semibold">Order #{order.orderId}</div>
                  <div className="text-sm text-gray-500">{formattedDates[index]}</div>
                </div>
                <div className="text-sm text-gray-700">{order.status}</div>
                <div className="text-sm text-gray-700">
                  ${order.total} for {order.items.length} items
                </div>
              </div>

              <div className="pl-4 space-y-1">
                {order.items.map((item, i) => (
                  <div key={item.id || i} className="text-sm text-gray-600">
                    • {item.name} (${item.price}) × {item.quantity}
                  </div>
                ))}
              </div>

              {/* <button className="self-start mt-2 bg-gray-100 hover:bg-gray-200 text-sm font-semibold px-4 py-1 rounded">
                View
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
