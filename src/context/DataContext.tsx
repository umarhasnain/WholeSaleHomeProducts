'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/firebase/FirebaseConfig';
import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// Full Product Type
export interface Product {
  oldPrice: ReactNode;
  discount: ReactNode;
  title: string;
  image: string | StaticImport;
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrls: string[];
}

// Data Context Type
interface DataContextType {
  products: Product[] | null;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Cart Context Type
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'products'));

        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        }));

        setProducts(fetchedProducts);
        setLoading(false);
        console.log('Fetched data: ', fetchedProducts);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ products, loading }}>
      {children}
    </DataContext.Provider>
  );
};

// Cart Context Provider
const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use DataContext
// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// };

// // Custom hook to use CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

export { DataContext, DataProvider, CartProvider, CartContext };
