'use client';
import { useEffect, useMemo, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';

interface Address {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  poNumber?: string;
}

export default function UserAddressForm() {
  const auth = getAuth();
  const user = auth.currentUser;


  const emptyAddress = useMemo<Address>(() => ({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States (US)',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    poNumber: '',
  }), []);

  const [billing, setBilling] = useState<Address>(emptyAddress);
  const [shipping, setShipping] = useState<Address>(emptyAddress);
  const [editBilling, setEditBilling] = useState(true);
  const [editShipping, setEditShipping] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.billingAddress) setBilling({ ...emptyAddress, ...data.billingAddress });
          if (data.shippingAddress) setShipping({ ...emptyAddress, ...data.shippingAddress });
          setEditBilling(false);
          setEditShipping(false);
        }
      }
    };

    fetchAddresses();
  }, [emptyAddress]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'billing' | 'shipping'
  ) => {
    const { name, value } = e.target;
    if (type === 'billing') {
      setBilling(prev => ({ ...prev, [name]: value }));
    } else {
      setShipping(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (type: 'billing' | 'shipping') => {
    if (!user) return;
    setLoading(true);
    const docRef = doc(db, 'users', user.uid);
    const data =
      type === 'billing'
        ? { billingAddress: billing }
        : { shippingAddress: shipping };
    await setDoc(docRef, data, { merge: true });
    if (type === 'billing') setEditBilling(false);
    else setEditShipping(false);
    setLoading(false);
    alert(`${type === 'billing' ? 'Billing' : 'Shipping'} address saved!`);
  };

  const renderInputs = (data: Address, type: 'billing' | 'shipping', editable: boolean) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="firstName" value={data.firstName} onChange={(e) => handleInput(e, type)} placeholder="First name *" className="input p-2 border rounded" disabled={!editable} />
      <input name="lastName" value={data.lastName} onChange={(e) => handleInput(e, type)} placeholder="Last name *" className="input p-2 border rounded" disabled={!editable} />
      <input name="companyName" value={data.companyName} onChange={(e) => handleInput(e, type)} placeholder="Company name *" className="input p-2 border rounded col-span-2" disabled={!editable} />
      <select name="country" value={data.country} onChange={(e) => handleInput(e, type)} className="input p-2 border rounded" disabled={!editable}>
        <option>United States (US)</option>
      </select>
      <input name="street" value={data.street} onChange={(e) => handleInput(e, type)} placeholder="Street address *" className="input p-2 border rounded" disabled={!editable} />
      <input name="unit" value={data.unit} onChange={(e) => handleInput(e, type)} placeholder="Apartment, suite, unit (optional)" className="input p-2 border rounded" disabled={!editable} />
      <input name="city" value={data.city} onChange={(e) => handleInput(e, type)} placeholder="Town / City *" className="input p-2 border rounded" disabled={!editable} />
      <input name="state" value={data.state} onChange={(e) => handleInput(e, type)} placeholder="State / County *" className="input p-2 border rounded" disabled={!editable} />
      <input name="zip" value={data.zip} onChange={(e) => handleInput(e, type)} placeholder="Postcode / ZIP *" className="input p-2 border rounded" disabled={!editable} />
      <input name="phone" value={data.phone} onChange={(e) => handleInput(e, type)} placeholder="Phone *" className="input p-2 border rounded" disabled={!editable} />
      <input name="email" value={data.email} onChange={(e) => handleInput(e, type)} placeholder="Email address *" className="input p-2 border rounded" disabled={!editable} />
      <input name="poNumber" value={data.poNumber} onChange={(e) => handleInput(e, type)} placeholder="PO Number (optional)" className="input p-2 border rounded col-span-2" disabled={!editable} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow rounded space-y-10">
      {/* Billing Address */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Billing Address</h2>
          {!editBilling && (
            <button onClick={() => setEditBilling(true)} className="text-blue-500 text-sm underline">Edit</button>
          )}
        </div>
        {renderInputs(billing, 'billing', editBilling)}
        {editBilling && (
          <div className="text-right mt-4">
            <button
              onClick={() => handleSave('billing')}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Billing'}
            </button>
          </div>
        )}
      </div>

      {/* Shipping Address */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          {!editShipping && (
            <button onClick={() => setEditShipping(true)} className="text-blue-500 text-sm underline">Edit</button>
          )}
        </div>
        {renderInputs(shipping, 'shipping', editShipping)}
        {editShipping && (
          <div className="text-right mt-4">
            <button
              onClick={() => handleSave('shipping')}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Shipping'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
