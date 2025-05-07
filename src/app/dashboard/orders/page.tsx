"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import {
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface ProductType {
  id: string;
  name: string;
  quantity: number;
  price: number;
  wholesalePrice: string;
  retailPrice: string;
  description: string;
  category: string;
  imageUrls: string[];
}

interface ShippingDetails {
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingEmail: string;
  shippingPhone: string;
}

interface BillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  poNumber: string;
  orderNotes: string;
}

interface OrderType {
  paymentMethod: string;
  id: string;
  customerEmail?: string;
  guestEmail?: string;
  createdAt: string;
  status: string;
  total: number;
  items: ProductType[];
  billingDetails: BillingDetails;
  shippingDetails: ShippingDetails;
}

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const list = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          customerEmail: data.customerEmail || "",
          guestEmail: data.guestEmail || "",
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
          status: data.status || "Pending",
          total: data.total || 0,
          items: data.items || [],
          paymentMethod: data.paymentMethod || "N/A",
          billingDetails: data.billingDetails || {},
          shippingDetails: data.shippingDetails || {},
        };
      });
      setOrders(list);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("Order deleted");
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    await updateDoc(doc(db, "orders", selectedOrder.id), { status });
    toast.success("Status updated");
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) =>
    `${order.customerEmail || ""} ${order.guestEmail || ""} ${order.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <TextField
        label="Search by Email or Order ID"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.customerEmail || order.guestEmail}</TableCell>
                <TableCell>{format(new Date(order.createdAt), "dd MMM yyyy")}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Cancelled"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>PKR {order.total}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedOrder(order);
                      setStatus(order.status);
                    }}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Billing Details:
              </Typography>
              <Typography variant="body2">
                Name: {selectedOrder.billingDetails.firstName}{" "}
                {selectedOrder.billingDetails.lastName}
              </Typography>
              <Typography variant="body2">
                Email: {selectedOrder.billingDetails.email}
              </Typography>
              <Typography variant="body2">
                Phone: {selectedOrder.billingDetails.phone}
              </Typography>
              <Typography variant="body2">
                Address: {selectedOrder.billingDetails.street},{" "}
                {selectedOrder.billingDetails.city},{" "}
                {selectedOrder.billingDetails.state},{" "}
                {selectedOrder.billingDetails.zip},{" "}
                {selectedOrder.billingDetails.country}
              </Typography>
              <Typography variant="body2">
                PO Number: {selectedOrder.billingDetails.poNumber}
              </Typography>
              <Typography variant="body2">
                Notes: {selectedOrder.billingDetails.orderNotes || "N/A"}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Shipping Details:
              </Typography>
              <Typography variant="body2">
                Email: {selectedOrder.shippingDetails.shippingEmail}
              </Typography>
              <Typography variant="body2">
                Phone: {selectedOrder.shippingDetails.shippingPhone}
              </Typography>
              <Typography variant="body2">
                Address: {selectedOrder.shippingDetails.shippingStreet},{" "}
                {selectedOrder.shippingDetails.shippingCity},{" "}
                {selectedOrder.shippingDetails.shippingState},{" "}
                {selectedOrder.shippingDetails.shippingZip}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Products:
              </Typography>
              {selectedOrder.items.map((item, index) => (
                <Paper key={index} sx={{ p: 1, my: 1 }}>
                  <Typography variant="body1">
                    {item.name} (x{item.quantity}) - PKR {item.price}
                  </Typography>
                  {item.imageUrls?.[0] && (
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.name}
                      style={{ width: 100, height: "auto", marginTop: 5 }}
                    />
                  )}
                </Paper>
              ))}

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          <Button variant="contained" onClick={handleStatusUpdate}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderManagement;
