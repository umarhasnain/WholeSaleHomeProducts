'use client'
import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  IconButton
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';

// ✅ Define a type for cart item
type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    setCart(savedCart);
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <Box>
          {cart.map((item) => (
            <Card key={item.id} sx={{ display: "flex", mb: 2, p: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                alt={item.name}
                height="150"
                image={item.imageUrl}
                sx={{ width: 150, objectFit: "cover", borderRadius: 2 }}
              />
              <Box sx={{ flex: 1, pl: 2 }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: PKR {item.price}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button variant="contained" color="secondary" size="small">
                      Quantity: 1
                    </Button>
                    <IconButton
                      aria-label="remove"
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Box>
            </Card>
          ))}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Total: PKR {calculateTotal()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "250px", height: "50px" }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
