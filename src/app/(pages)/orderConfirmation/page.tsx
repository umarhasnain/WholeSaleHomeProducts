'use client'
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const OrderConfirmationPage = () => {
  const router = useRouter();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Confirmed
      </Typography>
      <Typography variant="body1">
        Thank you for your order! We will process it shortly.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => router.push("/products")}>
        Go to Products
      </Button>
    </Container>
  );
};

export default OrderConfirmationPage;
