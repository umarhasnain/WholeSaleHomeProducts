'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/DataContext';
import { getFirestore, doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { app, auth } from '@/firebase/FirebaseConfig';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const BillingDetails: React.FC = () => {
  const { cart, calculateTotal } = useCart();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    poNumber: '',
    orderNotes: '',
    shipToDifferent: false,

    // Shipping address fields
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingPhone: '',
    shippingEmail: '',
  });

  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const db = getFirestore(app);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const billing = docSnap.data().billingAddress || {};
          setFormData((prev) => ({ ...prev, ...billing }));
        }
      } catch (error) {
        console.error('Error fetching billing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingDetails();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const isCheckbox = type === "checkbox";
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zip', 'phone', 'email'];
    const missingField = requiredFields.find(field => !formData[field as keyof typeof formData]);

    if (missingField) {
      toast.error('Please fill all required fields.');
      return;
    }

    // If shipping to a different address, check for required shipping fields
    if (formData.shipToDifferent) {
      const shippingRequiredFields = ['shippingStreet', 'shippingCity', 'shippingState', 'shippingZip', 'shippingPhone', 'shippingEmail'];
      const missingShippingField = shippingRequiredFields.find(field => !formData[field as keyof typeof formData]);

      if (missingShippingField) {
        toast.error('Please fill all required shipping fields.');
        return;
      }
    }

    setPlacingOrder(true); // 👉 Start loader

    try {
      const user = auth.currentUser;
      // if (!user) {
      //   toast.error('User not logged in.');
      //   setPlacingOrder(false);
      //   return;
      // }

      const db = getFirestore(app);
      const orderRef = collection(db, 'orders');

      type OrderData = {
        userId: string | null;
        guestEmail: string | null;
        items: typeof cart;
        total: number;
        billingDetails: typeof formData;
        createdAt: Timestamp;
        shippingDetails?: {
          shippingStreet: string;
          shippingCity: string;
          shippingState: string;
          shippingZip: string;
          shippingPhone: string;
          shippingEmail: string;
        };
      };
      
      // inside handlePlaceOrder:
      const orderData: OrderData = {
        userId: user ? user.uid : null,
        guestEmail: !user ? formData.email : null,
        items: cart,
        total: calculateTotal(),
        billingDetails: formData,
        createdAt: Timestamp.now(),
      };
      
      // Add shipping details if shipping to a different address
      if (formData.shipToDifferent) {
        orderData['shippingDetails'] = {
          shippingStreet: formData.shippingStreet,
          shippingCity: formData.shippingCity,
          shippingState: formData.shippingState,
          shippingZip: formData.shippingZip,
          shippingPhone: formData.shippingPhone,
          shippingEmail: formData.shippingEmail,
        };
      }

      // await addDoc(orderRef, orderData);
      const docRef = await addDoc(orderRef, orderData);
      toast.success('Order placed successfully!');
      setTimeout(() => router.push(`/order-confirmation?id=${docRef.id}`), 1000);

     
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order. Try again later.');
    } finally {
      setPlacingOrder(false); // 👉 Stop loader
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading billing info...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Billing Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Billing Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Company Name *</label>
          <input name="companyName" value={formData.companyName} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Country / Region *</label>
          <input name="country" value={formData.country} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          
          {/* <select name="country" value={formData.country}  className="block w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
            <option>United States (US)</option>
          </select> */}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Street Address *</label>
          <input name="street" value={formData.street} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">City *</label>
            <input name="city" value={formData.city} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">State *</label>
            <input name="state" value={formData.state} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">ZIP *</label>
            <input name="zip" value={formData.zip} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">PO Number (optional)</label>
          <input name="poNumber" value={formData.poNumber} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="shipToDifferent" checked={formData.shipToDifferent} onChange={handleChange} />
            Ship to a different address?
          </label>
        </div>

        {formData.shipToDifferent && (
          <>
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-4">Shipping Address</h3>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Street Address *</label>
              <input name="shippingStreet" value={formData.shippingStreet} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">City *</label>
                <input name="shippingCity" value={formData.shippingCity} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">State *</label>
                <input name="shippingState" value={formData.shippingState} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">ZIP *</label>
                <input name="shippingZip" value={formData.shippingZip} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input name="shippingPhone" value={formData.shippingPhone} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" name="shippingEmail" value={formData.shippingEmail} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
          </>
        )}

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Order Notes (optional)</label>
          <textarea
            name="orderNotes"
            value={formData.orderNotes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-4">Your Order</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm border-b py-2">
            <div>
              <Image src={item.imageUrls[0]} alt={item.name} height={100} width={100} />
            </div>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="pt-4 border-t text-right text-lg font-bold">
          Total: ${calculateTotal().toFixed(2)}
        </div>

        <div className="space-y-2 pt-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment" defaultChecked />
            Credit Card Payment
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment" />
            Cash on Delivery
          </label>
        </div>

        <div className="flex items-start gap-2 text-sm pt-2">
          <input type="checkbox" required />
          <span>
            I agree to the website{' '}
            <a href="#" className="text-blue-600 underline">
              terms and conditions
            </a>
          </span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={placingOrder}
          className={`w-full ${placingOrder ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 px-4 rounded-md mt-4 transition-all flex justify-center items-center gap-2`}
        >
          {placingOrder ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Placing Order...
            </>
          ) : (
            'PLACE ORDER'
          )}
        </button>
      </div>
    </div>
  );
};

export default BillingDetails;
