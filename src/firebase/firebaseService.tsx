import { db, storage } from '@/firebase/FirebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Product } from '@/app/types/types';

const productRef = collection(db, 'products');

export const createProduct = async (product: Product) => {
  let imageUrl = '';
  if (product.imageFile) {
    const imageRef = ref(storage, `products/${Date.now()}-${product.imageFile.name}`);
    await uploadBytes(imageRef, product.imageFile);
    imageUrl = await getDownloadURL(imageRef);
  }

  const data = { ...product, imageUrl };
  delete data.imageFile;

  const docRef = await addDoc(productRef, data);
  return { id: docRef.id, ...data };
};

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Product),
  }));
};

export const updateProduct = async (id: string, product: Product) => {
  let imageUrl = product.imageUrl;
  if (product.imageFile) {
    const imageRef = ref(storage, `products/${Date.now()}-${product.imageFile.name}`);
    await uploadBytes(imageRef, product.imageFile);
    imageUrl = await getDownloadURL(imageRef);
  }

  const data = { ...product, imageUrl };
  delete data.imageFile;

  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, data);
};

export const deleteProduct = async (id: string) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};
