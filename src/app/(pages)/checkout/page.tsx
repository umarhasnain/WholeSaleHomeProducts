'use client'
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  Paper
} from "@mui/material";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/FirebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

// ✅ Define a type for cart items
type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const CheckoutPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  const fetchCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    setCart(savedCart);
  };

  const handlePlaceOrder = async () => {
    if (!name || !email || !address) {
      toast.error("Please fill all fields.");
      return;
    }

    const order = {
      customerName: name,
      customerEmail: email,
      address,
      products: cart,
      totalPrice: cart.reduce((total, item) => total + item.price, 0),
      createdAt: Timestamp.now(),
      status: "Pending",
    };

    try {
      await addDoc(collection(db, "orders"), order);
      localStorage.removeItem("cart");
      toast.success("Order placed successfully");
      router.push("/order-confirmation");
    } catch {
      toast.error("Error placing order");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>
      <Paper sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Enter your details
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Delivery Address"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total: PKR {cart.reduce((total, item) => total + item.price, 0)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "50px", fontSize: "16px" }}
              fullWidth
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
