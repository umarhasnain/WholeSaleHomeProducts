
// src/types.ts
export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    imageFile?: File;
  }
  