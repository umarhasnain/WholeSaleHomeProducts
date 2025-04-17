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

// Context Type
interface DataContextType {
  products: Product[] | null;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

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
        console.log("Fetched data: ", fetchedProducts);
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

export { DataContext, DataProvider };
