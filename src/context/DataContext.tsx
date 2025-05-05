// 'use client';

// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { db } from '@/firebase/FirebaseConfig';
// import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
// import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// // Full Product Type
// export interface Product {
//   oldPrice: ReactNode;
//   discount: ReactNode;
//   title: string;
//   image: string | StaticImport;
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   imageUrls: string[];
// }

// // Data Context Type
// interface DataContextType {
//   products: Product[] | null;
//   loading: boolean;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// // Cart Context Type
// interface CartContextType {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// interface DataProviderProps {
//   children: ReactNode;
// }

// const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'products'));

//         const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Product, 'id'>),
//         }));

//         setProducts(fetchedProducts);
//         setLoading(false);
//         console.log('Fetched data: ', fetchedProducts);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ products, loading }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// // Cart Context Provider
// const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const isAlreadyInCart = prevCart.some((item) => item.id === product.id);
//       if (!isAlreadyInCart) {
//         return [...prevCart, product];
//       }
//       return prevCart ;
//       ;
//     });
//   };
//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use DataContext
// // export const useData = () => {
// //   const context = useContext(DataContext);
// //   if (!context) {
// //     throw new Error('useData must be used within a DataProvider');
// //   }
// //   return context;
// // };

// // // Custom hook to use CartContext
// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error('useCart must be used within a CartProvider');
// //   }
// //   return context;
// // };

// export { DataContext, DataProvider, CartProvider, CartContext };



// 'use client';

// import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import { db } from '@/firebase/FirebaseConfig';
// import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
// import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// // Full Product Type
// export interface Product {
//   retailPrice: ReactNode;
//   wholesalePrice: ReactNode;
//   quantity: number; // Change this from `unknown` to `number`
//   oldPrice: ReactNode;
//   discount: ReactNode;
//   title: string;
//   image: string | StaticImport;
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   imageUrls: string[];
// }


// // Data Context Type
// interface DataContextType {
//   products: Product[] | null;
//   loading: boolean;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// // Cart Context Type
// interface CartContextType {
//   cart: Product[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
//   calculateTotal: () => number;
//   updateQuantity: (productId: string, quantity: number) => void;
//   getCartCount: () => number; 
// }


// const CartContext = createContext<CartContextType | undefined>(undefined);

// interface DataProviderProps {
//   children: ReactNode;
// }

// const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'products'));

//         const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Product, 'id'>),
//         }));

//         setProducts(fetchedProducts);
//         setLoading(false);
//         console.log('Fetched data: ', fetchedProducts);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ products, loading }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// // Cart Context Provider
// const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const isAlreadyInCart = prevCart.some((item) => item.id === product.id);
//       if (!isAlreadyInCart) {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//       return prevCart;
//     });
//   };
//   const getCartCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };
  

//   const updateQuantity = (productId: string, quantity: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
//   };
  
//   return (
//     <CartContext.Provider value={{ updateQuantity,cart, addToCart,getCartCount, removeFromCart, clearCart, calculateTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use DataContext
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

// export { DataContext, DataProvider, CartProvider, CartContext };


'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { db } from '@/firebase/FirebaseConfig';
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

// Product Type
export interface Product {
  retailPrice: number;
  wholesalePrice: number;
  quantity: number;
  oldPrice: number;
  discount: number;
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

// Data Context
interface DataContextType {
  products: Product[] | null;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Cart Context
interface CartContextType {
  cart: Product[];
  isWholesale: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartCount: () => number;
  user: User | null;
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
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          collection(db, 'products')
        );

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

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isWholesale, setIsWholesale] = useState<boolean>(false);

  // Auth detection
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsWholesale(!!currentUser); // if user exists → true
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product: Product) => {
    const selectedPrice = isWholesale
      ? product.wholesalePrice
      : product.retailPrice;

    const productWithCorrectPrice: Product = {
      ...product,
      price: selectedPrice,
      quantity: 1,
    };

    setCart((prevCart) => {
      const isAlreadyInCart = prevCart.some((item) => item.id === product.id);
      if (!isAlreadyInCart) {
        return [...prevCart, productWithCorrectPrice];
      }
      return prevCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isWholesale,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        calculateTotal,
        getCartCount,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hooks
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { DataContext, DataProvider, CartProvider, CartContext };
