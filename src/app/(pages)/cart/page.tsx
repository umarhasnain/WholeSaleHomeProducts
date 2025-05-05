"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "@/context/DataContext";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

// Initialize Firebase
const db = getFirestore();
const auth = getAuth();

type ShippingAddress = {
  country: string;
  state: string;
  city: string;
  zip: string;
};

const fetchShippingAddress = async (): Promise<ShippingAddress | null> => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().shippingAddress || null;
    }
  }
  return null;
};

const updateShippingAddress = async (newAddress: ShippingAddress) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { shippingAddress: newAddress }, { merge: true });
  }
};

const CartPage = () => {
  const { cart, removeFromCart, calculateTotal, updateQuantity } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    country: "",
    state: "",
    city: "",
    zip: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getShippingAddress = async () => {
      const address = await fetchShippingAddress();
      if (address) {
        setShippingAddress(address);
        setNewAddress(address);
      }
    };
    getShippingAddress();
  }, []);

  const handleIncrease = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id: string, currentQty: number) => {
    if (currentQty > 1) updateQuantity(id, currentQty - 1);
  };

  const handleAddressChange = (field: keyof ShippingAddress) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAddress({ ...newAddress, [field]: event.target.value });
  };

  const handleAddressSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateShippingAddress(newAddress);
    setShippingAddress(newAddress);
    setShowForm(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  boxShadow: 1,
                }}
              >
                <Image
                  src={item.imageUrls[0] || "/placeholder.png"}
                  alt={item.name}
                  width={100}
                  height={100}
                  unoptimized
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton onClick={() => handleDecrease(item.id, item.quantity)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => handleIncrease(item.id, item.quantity)}>
                    <AddIcon />
                  </IconButton>
                </Stack>

                <IconButton onClick={() => removeFromCart(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight={700}>
              Total: ${calculateTotal()}
            </Typography>
            <Link href="checkout" >
            <Button variant="contained" size="large" color="primary">
              Proceed to Checkout
            </Button>
            </Link>
          </Box>
        </>
      )}

      <Divider sx={{ my: 5 }} />

      <Box>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>

        {shippingAddress ? (
          <Typography sx={{ mb: 2 }}>
            Shipping to{" "}
            <strong>
              {shippingAddress.country}, {shippingAddress.state}, {shippingAddress.city},{" "}
              {shippingAddress.zip}
            </strong>
          </Typography>
        ) : (
          <Typography sx={{ mb: 2 }}>
            No shipping address found. Please enter your shipping address.
          </Typography>
        )}

        {!showForm && (
          <Button variant="outlined" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
            Change Shipping Address
          </Button>
        )}

        {showForm && (
          <form onSubmit={handleAddressSubmit}>
            <TextField
              label="Country"
              fullWidth
              value={newAddress.country}
              onChange={handleAddressChange("country")}
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              fullWidth
              value={newAddress.state}
              onChange={handleAddressChange("state")}
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              fullWidth
              value={newAddress.city}
              onChange={handleAddressChange("city")}
              sx={{ mb: 2 }}
            />
            <TextField
              label="ZIP Code"
              fullWidth
              value={newAddress.zip}
              onChange={handleAddressChange("zip")}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" className="bg-blue-400" variant="contained" >
                Update Address
              </Button>
              <Button variant="text" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
