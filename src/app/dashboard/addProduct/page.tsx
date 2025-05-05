'use client';
import React, { useState, useEffect, ChangeEvent } from "react";
import { db, storage } from "@/firebase/FirebaseConfig.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MUIButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUploadCloud } from "react-icons/fi";
import Image from "next/image";

// ✅ Updated Product Type
type Product = {
  id?: string;
  name: string;
  retailPrice: string;
  wholesalePrice: string;
  category: string;
  description: string;
  imageUrls: string[];
};

const AddProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productData, setProductData] = useState<Product>({
    name: "",
    retailPrice: "",
    wholesalePrice: "",
    category: "",
    description: "",
    imageUrls: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const list = snap.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(list);
    });
    return unsub;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleOpen = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setProductData(product);
    } else {
      setEditingProduct(null);
      setProductData({
        name: "",
        retailPrice: "",
        wholesalePrice: "",
        category: "",
        description: "",
        imageUrls: [],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageFiles([]);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let uploadedUrls: string[] = [];

      if (imageFiles.length > 0) {
        uploadedUrls = await Promise.all(
          imageFiles.map(async (file) => {
            const fileRef = ref(storage, `products/${file.name}`);
            await uploadBytes(fileRef, file);
            return await getDownloadURL(fileRef);
          })
        );
      }

      const newProduct: Product = {
        ...productData,
        imageUrls: uploadedUrls.length > 0 ? uploadedUrls : productData.imageUrls,
      };

      if (editingProduct?.id) {
        await updateDoc(doc(db, "products", editingProduct.id), newProduct);
        toast.success("Product updated!");
      } else {
        await addDoc(collection(db, "products"), newProduct);
        toast.success("Product added!");
      }

      handleClose();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted!");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSetPrimaryImage = (productId: string, imageUrl: string) => {
    const product = products.find(p => p.id === productId);
    if (!product || !imageUrl) return;

    const currentUrls = [...product.imageUrls];
    const index = currentUrls.indexOf(imageUrl);
    if (index > 0) {
      currentUrls.splice(index, 1);
      currentUrls.unshift(imageUrl);

      updateDoc(doc(db, "products", productId), {
        imageUrls: currentUrls,
      }).then(() => {
        toast.success("Primary image updated!");
      }).catch(() => {
        toast.error("Failed to update image");
      });
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(filterText.toLowerCase()) ||
    p.category.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-800">Manage Products</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800"
            onClick={() => handleOpen()}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg p-5 border border-blue-200 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-blue-700">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-blue-600 font-bold">
              Retail: PKR {product.retailPrice} | Wholesale: PKR {product.wholesalePrice}
            </p>
            <p className="text-sm text-gray-500 my-2">{product.description}</p>
            <div className="flex gap-2 overflow-x-auto">
              {product.imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 relative rounded-lg border-2 ${idx === 0 ? 'border-green-500' : 'border-blue-300'} shadow-md overflow-hidden cursor-pointer`}
                  onClick={() => handleSetPrimaryImage(product.id!, url)}
                  title={idx === 0 ? "Primary Image" : "Set as Primary"}
                >
                  <Image
                    src={url}
                    alt="Product"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 80px, 100px"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleOpen(product)}
                className="text-sm px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id!)}
                className="text-sm px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile}>
        <DialogTitle className="text-blue-800 font-bold">
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none"
            />
            <input
              type="text"
              name="retailPrice"
              placeholder="Retail Price"
              value={productData.retailPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none"
            />
            <input
              type="text"
              name="wholesalePrice"
              placeholder="Wholesale Price"
              value={productData.wholesalePrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none"
            />
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Health & Household">Health & Household</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Automotive">Automotive</option>
              <option value="Sports & Outdoor">Sports & Outdoor</option>
              <option value="Tools & Home Improvement">Tools & Home Improvement</option>
              <option value="Toys">Toys</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none"
            />
            <div className="flex items-center justify-center gap-2">
              <FiUploadCloud className="text-blue-500 h-10 w-12" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={handleClose} color="secondary">
            Cancel
          </MUIButton>
          <MUIButton onClick={handleSave} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
